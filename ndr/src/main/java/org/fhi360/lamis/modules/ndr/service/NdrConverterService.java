package org.fhi360.lamis.modules.ndr.service;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.fhi360.lamis.modules.ndr.domain.entities.MessageLog;
import org.fhi360.lamis.modules.ndr.domain.repositories.MessageLogRepository;
import org.fhi360.lamis.modules.ndr.mapper.*;
import org.fhi360.lamis.modules.ndr.schema.*;
import org.fhi360.lamis.modules.ndr.util.ZipUtility;
import org.lamisplus.modules.base.config.ApplicationProperties;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.xml.XMLConstants;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import java.io.*;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@RequiredArgsConstructor
@Service
public class NdrConverterService {
    private static final String BASE_DIR = "/ndr/transfer/";
    private final JdbcTemplate jdbcTemplate;
    private final ApplicationProperties applicationProperties;
    private final MessageLogRepository messageLogRepository;
    private final AddressTypeMapper addressTypeMapper;
    private final RegimenTypeMapper regimenTypeMapper;
    private final ConditionSpecificQuestionsTypeMapper conditionSpecificQuestionsTypeMapper;
    private final CommonQuestionsTypeMapper commonQuestionsTypeMapper;
    private final PatientDemographicsMapper patientDemographicsMapper;
    private final LaboratoryReportTypeMapper laboratoryReportTypeMapper;
    private final EncountersTypeMapper encountersTypeMapper;
    private final CodeSetResolver codeSetResolver;
    private final SimpMessageSendingOperations messagingTemplate;
    private Map<Long, Integer> facilityTotal = new HashMap<>();


    private AtomicLong messageId = new AtomicLong(0);

    public void buildMessage(long facilityId) {
        cleanupFacility(facilityId);
        String folder = applicationProperties.getTempDir() + BASE_DIR + "temp/" + facilityId + "/";
        new File(folder).mkdirs();

        String query = "SELECT DISTINCT id, hospital_num, archived FROM patient p WHERE facility_id = ?";
        Map<String, Long> patients = jdbcTemplate.query(query, (resultSet) -> {
            Map<String, Long> identifiers = new HashMap<>();
            while (resultSet.next()) {
                long patientId = resultSet.getLong("id");
                String hospitalNum = resultSet.getString("hospital_num");

                identifiers.put(hospitalNum, patientId);
            }
            return identifiers;
        }, facilityId);

        facilityTotal.put(facilityId, patients.size());
        AtomicInteger patient = new AtomicInteger();
        ExecutorService executorService = Executors.newFixedThreadPool(2);
        patients.forEach((key, value) -> {
            String identifier = Long.toString(facilityId).concat("_").concat(StringUtils.trim(key));
            //Get the last message status
            String statusCode = "INITIAL";
            if (!messageLogRepository.findByIdentifier(identifier).isEmpty()) {
                statusCode = "UPDATED";
            }
            String finalStatusCode = statusCode;
            executorService.execute(() -> buildMessage(facilityId, value, finalStatusCode, identifier, patient.incrementAndGet()));
        });
        executorService.shutdown();
        while (!executorService.isTerminated()) {

        }
        zipFiles(facilityId);
    }


    //This method builds the xml message for a patient. The last message variable determines what records in clinic encounters, drug refills and laboratoryoratory investigations should be included in the messages.
    private void buildMessage(long facilityId, long patientId, String statusCode, String identifier, int count) {
        String facilityName = jdbcTemplate.queryForObject("select name from ndr_facility where id = ?",
                String.class, facilityId);

        this.messagingTemplate.convertAndSend("/topic/ndr-status", String.format("%s: Generating for Patient %s of %s",
                StringUtils.trimToEmpty(facilityName), count, facilityTotal.get(facilityId)));
        ///throws JAXBException, SAXException, DatatypeConfigurationException
        try {
            JAXBContext jaxbContext = JAXBContext.newInstance(Container.class);

            //Represents the Container (highest level of the schema)
            Container container = new Container();

            //Set the Header Information
            MessageHeaderType header = MessageHeaderTypeMapper.messageHeaderType(patientId);
            header.setMessageStatusCode(statusCode);
            header.setMessageUniqueID(Long.toString(messageId.incrementAndGet()));

            //Set the Header to the Container
            container.setMessageHeader(header);

            //Create the Individual Report
            IndividualReportType individual = new IndividualReportType();
            //Patient Demographics
            PatientDemographicsType patient = patientDemographicsMapper.patientDemographics(patientId);
            individual.setPatientDemographics(patient);
            //Condition
            ConditionType condition = new ConditionType();
            condition.setConditionCode(codeSetResolver.getCode("CONDITION_CODE", "HIV_CODE"));
            ProgramAreaType programArea = new ProgramAreaType();
            programArea.setProgramAreaCode(codeSetResolver.getCode("PROGRAM_AREA", "HIV"));
            condition.setProgramArea(programArea);

            //Address
            AddressType address = addressTypeMapper.addressType(patientId);
            condition.setPatientAddress(address);
            //Common Questions
            CommonQuestionsType common = commonQuestionsTypeMapper.commonQuestionsType(patientId);
            condition.setCommonQuestions(common);

            //HIV Specific
            ConditionSpecificQuestionsType disease = conditionSpecificQuestionsTypeMapper.conditionSpecificQuestionsType(patientId);
            condition.setConditionSpecificQuestions(disease);
            //Encounters
            EncountersType encounter = encountersTypeMapper.encounterType(patientId);
            condition.setEncounters(encounter);
            //Populate ConditionType with laboratory report
            condition = laboratoryReportTypeMapper.laboratoryReportType(patientId, condition);
            //Populate ConditionType with regimen
            condition = regimenTypeMapper.regimenType(patientId, condition);
            /**
             //Immunizations
             ImmunizationType immunization = new ImmunizationTypeResolver().immunizationType(id);
             if(immunization != null) condition.getImmunization().add(immunization);

             //Contacts
             ContactType contact = new ContactTypeResolver().contactType(id);
             if(contact != null) condition.getContact().add(contact);
             **/

            //Set the Condition to Individual
            //And finally set the individual to the Container
            individual.getCondition().add(condition);
            container.setIndividualReport(individual);

            //Validate Message Against NDR Schema (Version 1.2)
            Marshaller jaxbMarshaller = jaxbContext.createMarshaller();
            SchemaFactory sf = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema schema = sf.newSchema(getClass().getClassLoader().getResource("NDR 1.5.xsd"));

            jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
            jaxbMarshaller.setProperty(Marshaller.JAXB_ENCODING, "UTF-8");

            jaxbMarshaller.setSchema(schema);

            //Call Validator class to perform the validation
            //jaxbMarshaller.setEventHandler(new Validator());

            Thread.sleep(1000);     //Delay for some milli seconds
            Date date = new Date();
            SimpleDateFormat dateFormat = new SimpleDateFormat("ddMMyyyy");
            SimpleDateFormat dateFormat2 = new SimpleDateFormat("HHmmss.ms");

            String fileName = header.getMessageSendingOrganization().getFacilityID() + "_" + dateFormat.format(date) +
                    "_" + dateFormat2.format(date) + "_" + RandomStringUtils.randomAlphabetic(7) + ".xml";
            File file = new File(applicationProperties.getTempDir() + BASE_DIR + "temp/" + facilityId + "/" + fileName);

            jaxbMarshaller.marshal(container, file);

            //Log the particulars of message generated into the message log table
            MessageLog messageLog = new MessageLog(messageId.get(), identifier, fileName, LocalDateTime.now());
            saveMessageLog(messageLog);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    public void saveMessageLog(MessageLog messageLog) {
        messageLogRepository.save(messageLog);
    }

    private String zipFiles(long facilityId) {
        String contextPath = applicationProperties.getTempDir();
        String fileToReturn = "";
        String facilityName = jdbcTemplate.queryForObject("select name from ndr_facility where id = ?",
                String.class, facilityId);
        LocalDate timestamp = LocalDate.now();
        String fileName = StringUtils.trimToEmpty(facilityName) + "_" + timestamp + ".zip";

        try {
            String sourceFolder = contextPath + BASE_DIR + "temp/" + facilityId + "/";
            String outputZipFile = contextPath + BASE_DIR + "ndr/" + fileName;
            new File(contextPath + BASE_DIR + "ndr").mkdirs();
            new File(Paths.get(outputZipFile).toAbsolutePath().toString()).createNewFile();
            List<File> files = new ArrayList<>();
            try (Stream<Path> walk = Files.walk(Paths.get(sourceFolder))) {
                files = walk.filter(Files::isRegularFile)
                        .map(Path::toFile)
                        .collect(Collectors.toList());
            } catch (IOException e) {
                e.printStackTrace();
            }

            long twentyMB = FileUtils.ONE_MB * 20;
            ZipUtility.zip(files, Paths.get(outputZipFile).toAbsolutePath().toString(), twentyMB);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return fileToReturn;
    }


    public List<Map<String, Object>> listFacilities() {
        return jdbcTemplate.query("select distinct name, facility_id from patient join ndr_facility f on facility_id = f.id order by 1", rs -> {
            List<Map<String, Object>> facilities = new ArrayList<>();
            while (rs.next()) {
                Map<String, Object> facility = new HashMap<>();
                facility.put("name", rs.getString(1));
                facility.put("id", rs.getString(2));
                facilities.add(facility);
            }
            return facilities;
        });
    }

    @SneakyThrows
    public Set<String> listFiles() {
        String folder = applicationProperties.getTempDir() + BASE_DIR + "ndr";
        return listFilesUsingDirectoryStream(folder);
    }

    @SneakyThrows
    public ByteArrayOutputStream downloadFile(String file) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        String folder = applicationProperties.getTempDir() + BASE_DIR + "ndr/";
        Optional<String> fileToDownload = listFilesUsingDirectoryStream(folder).stream()
                .filter(f -> f.equals(file))
                .findFirst();
        fileToDownload.ifPresent(s -> {
            try (InputStream is = new FileInputStream(folder + s)) {
                IOUtils.copy(is, baos);
            } catch (IOException ignored) {
            }
        });
        return baos;
    }

    private void cleanupFacility(Long facilityId) {
        String folder = applicationProperties.getTempDir() + BASE_DIR + "temp/" + facilityId + "/";
        try {
            if (Files.isDirectory(Paths.get(folder))) {
                FileUtils.deleteDirectory(new File(folder));
            }
        } catch (IOException ignored) {
        }
        String facilityName = jdbcTemplate.queryForObject("select name from ndr_facility where id = ?",
                String.class, facilityId);
        String file = applicationProperties.getTempDir() + BASE_DIR + "ndr/" + StringUtils.trimToEmpty(facilityName);
        try {
            Files.list(Paths.get(applicationProperties.getTempDir() + BASE_DIR + "ndr/"))
                    .filter(path -> path.getFileName().toString().contains(file))
                    .forEach(path -> {
                        try {
                            Files.delete(path);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    });
        } catch (IOException e) {
        }
    }

    private Set<String> listFilesUsingDirectoryStream(String dir) throws IOException {
        Set<String> fileList = new HashSet<>();
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(Paths.get(dir))) {
            for (Path path : stream) {
                if (!Files.isDirectory(path)) {
                    fileList.add(path.getFileName()
                            .toString());
                }
            }
        }
        return fileList;
    }

    @PostConstruct
    public void init() {
        this.messageId.set(messageLogRepository.lastMessageId());
    }
}
