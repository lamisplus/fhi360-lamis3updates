/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.fhi360.lamis.modules.ndr.mapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.fhi360.lamis.modules.ndr.schema.*;
import org.fhi360.lamis.modules.ndr.util.DateUtil;
import org.fhi360.lamis.modules.ndr.util.NumericUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.xml.datatype.DatatypeConfigurationException;
import java.util.Date;

@Slf4j
@Component
@RequiredArgsConstructor
public class LaboratoryReportTypeMapper {
    private final JdbcTemplate jdbcTemplate;
    private final CodeSetResolver codeSetResolver;

    public ConditionType laboratoryReportType(long patientId, ConditionType condition) {
        final String[] query = {"SELECT DISTINCT l.id, l.uuid, date_sample_collected, date_result_received, lt.description, " +
                "lt.id lab_test_id, result FROM laboratory l JOIN laboratory_line ll on l.id = laboratory_id inner join lab_test lt " +
                "on lab_test_id = lt.id WHERE l.patient_id = ? and date_result_received between '1901-01-01' " +
                "and current_date and (result != '' OR result is not null ) and l.archived = false AND ll.archived = false " +
                "ORDER BY date_result_received"};
        jdbcTemplate.query(query[0], rs -> {
            LaboratoryReportType laboratory = new LaboratoryReportType();
            laboratory.setVisitID(rs.getString("uuid"));
            Date dateReported = rs.getDate("date_result_received");
            if (dateReported != null) {
                try {
                    laboratory.setVisitDate(DateUtil.getXmlDate(dateReported));
                } catch (DatatypeConfigurationException e) {
                    e.printStackTrace();
                }
            }
            laboratory.setLaboratoryTestIdentifier("0000001");

            long labTestId = rs.getLong("lab_test_id");
            String description = rs.getString("description");
            CodedSimpleType cst = codeSetResolver.getCodedSimpleType("LAB_RESULTED_TEST", description);
            if (cst.getCode() != null) {
                String result = StringUtils.trimToEmpty(rs.getString("result"));

                if (StringUtils.isNotEmpty(result)) {
                    //Set the NDR code & description for this lab test
                    LaboratoryOrderAndResult labResult = new LaboratoryOrderAndResult();
                    labResult.setLaboratoryResultedTest(cst);
                    Date dateCollected = rs.getDate("date_sample_collected");
                    if (dateCollected != null) {
                        try {
                            laboratory.setCollectionDate(DateUtil.getXmlDate(dateCollected));
                            labResult.setOrderedTestDate(DateUtil.getXmlDate(dateCollected));
                        } catch (DatatypeConfigurationException e) {
                            e.printStackTrace();
                        }
                    }
                    try {
                        labResult.setResultedTestDate(DateUtil.getXmlDate(rs.getDate("date_result_received")));
                    } catch (DatatypeConfigurationException e) {
                        e.printStackTrace();
                    }

                    //Set the lab test result values either numeric or text
                    AnswerType answer = new AnswerType();
                    NumericType numeric = new NumericType();
                    if (NumericUtils.isNumeric(StringUtils.replace(result, ",", ""))) {
                        Double d = Double.valueOf(StringUtils.replace(result, ",", ""));
                        numeric.setValue1(d.intValue());
                        answer.setAnswerNumeric(numeric);
                    } else {
                        if (labTestId == 16) {
                            numeric.setValue1(0);  //if lab test is a viralLoad set the value to 0
                            answer.setAnswerNumeric(numeric);
                        } else {
                            answer.setAnswerText(result);
                        }
                    }
                    labResult.setLaboratoryResult(answer);
                    laboratory.getLaboratoryOrderAndResult().add(labResult);
                    if (laboratory.getVisitDate() != null && laboratory.getLaboratoryOrderAndResult() != null) {
                        condition.getLaboratoryReport().add(laboratory);
                    }
                }
            }

        }, patientId);
        return condition;
    }

}
