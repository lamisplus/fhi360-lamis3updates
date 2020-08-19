package org.fhi360.lamis.modules.laboratory.service;

import lombok.RequiredArgsConstructor;
import org.fhi360.lamis.modules.laboratory.web.rest.vm.LaboratoryDTO;
import org.fhi360.lamis.modules.laboratory.web.rest.vm.LaboratoryLineDTO;
import org.lamisplus.modules.lamis.legacy.domain.entities.Devolve;
import org.lamisplus.modules.lamis.legacy.domain.entities.Laboratory;
import org.lamisplus.modules.lamis.legacy.domain.entities.LaboratoryLine;
import org.lamisplus.modules.lamis.legacy.domain.entities.Pharmacy;
import org.lamisplus.modules.lamis.legacy.domain.repositories.DevolveRepository;
import org.lamisplus.modules.lamis.legacy.domain.repositories.LaboratoryLineRepository;
import org.lamisplus.modules.lamis.legacy.domain.repositories.LaboratoryRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LaboratoryService {
    private final LaboratoryRepository laboratoryRepository;
    private final LaboratoryLineRepository laboratoryLineRepository;
    private final DevolveRepository devolveRepository;

    public Laboratory saveLaboratory(LaboratoryDTO dto) {
        Laboratory laboratory = new Laboratory();
        //laboratory.setId(dto.getId());
        laboratory.setPatient(dto.getPatient());
        laboratory.setFacility(dto.getFacility());
        laboratory.setDateSampleCollected(dto.getDateSampleCollected());
        laboratory.setDateResultReceived(dto.getDateResultReceived());
        laboratory.setDateAssay(dto.getDateAssay());
        laboratory.setLabNo(dto.getLabNo());

        List<LaboratoryLine> lines = dto.getLines().stream().map(line -> {
            LaboratoryLine laboratoryLine = new LaboratoryLine();
            //laboratoryLine.setId(dto.getId());
            laboratoryLine.setPatient(dto.getPatient());
            laboratoryLine.setFacility(dto.getFacility());
            laboratoryLine.setLaboratory(laboratory);
            laboratoryLine.setResult(line.getResult());
            laboratoryLine.setComment(line.getComment());
            laboratoryLine.setIndication(line.getIndication());
            laboratoryLine.setLabTest(line.getLabTest());

            return laboratoryLine;
        }).collect(Collectors.toList());

        final Devolve[] devolve = {null};
        final Devolve[] devolve1 = {null};
        if (dto.getId() != null) {
            devolveRepository.findByPatient(laboratory.getPatient())
                    .forEach(d -> {
                        if (d.getRelatedViralLoad() != null && Objects.equals(dto.getId(), d.getRelatedViralLoad().getId())) {
                            devolve[0] = d;
                        }
                        if (d.getRelatedCd4() != null && Objects.equals(dto.getId(), d.getRelatedCd4().getId())) {
                            devolve1[0] = d;
                        }
                    });
            laboratoryRepository.deleteById(dto.getId());
        }
        laboratory.getLines().addAll(lines);
        Laboratory laboratory1 = laboratoryRepository.save(laboratory);
        if (devolve[0] != null) {
            devolve[0].setRelatedViralLoad(laboratory1);
            devolveRepository.save(devolve[0]);
        }
        if (devolve1[0] != null) {
            devolve1[0].setRelatedCd4(laboratory1);
            devolveRepository.save(devolve1[0]);
        }
        return laboratory1;
    }

    public Laboratory updateLaboratory(LaboratoryDTO dto) {
        return saveLaboratory(dto);
    }

    public List<LaboratoryLineDTO> getLaboratoryLines(Long laboratoryId) {
        List<LaboratoryLineDTO> lines = new ArrayList<>();
        laboratoryRepository.findById(laboratoryId).ifPresent(laboratory ->
                laboratoryLineRepository.findByLaboratory(laboratory).forEach(laboratoryLine -> {
                    LaboratoryLineDTO line = new LaboratoryLineDTO();
                    line.setId(laboratoryLine.getId());
                    line.setComment(laboratoryLine.getComment());
                    line.setIndication(laboratoryLine.getIndication());
                    line.setResult(laboratoryLine.getResult());
                    line.setLabTest(laboratoryLine.getLabTest());
                    lines.add(line);
                }));
        return lines;
    }


    public void deleteLaboratory(Long laboratoryId) {
        laboratoryRepository.findById(laboratoryId).ifPresent(laboratory-> {
            devolveRepository.findByPatient(laboratory.getPatient())
                    .forEach(devolve -> {
                        if (devolve.getRelatedViralLoad() != null && Objects.equals(laboratoryId, devolve.getRelatedViralLoad().getId())) {
                            devolve.setRelatedViralLoad(null);
                            devolveRepository.save(devolve);
                        }
                        if (devolve.getRelatedCd4() != null && Objects.equals(laboratoryId, devolve.getRelatedCd4().getId())) {
                            devolve.setRelatedCd4(null);
                            devolveRepository.save(devolve);
                        }
                    });
            laboratoryRepository.delete(laboratory);
        });
    }
}
