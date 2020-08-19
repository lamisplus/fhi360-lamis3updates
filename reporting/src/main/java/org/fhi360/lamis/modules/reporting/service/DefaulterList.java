package org.fhi360.lamis.modules.reporting.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.fhi360.lamis.modules.reporting.service.vm.PatientVM;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DefaulterList {
    private final JdbcTemplate jdbcTemplate;

    private JRBeanCollectionDataSource missedRefillAppointment(Long facilityId, LocalDate start, LocalDate end) {
        String query = "SELECT * FROM (" +
                "SELECT p.id, hospital_num, surname, other_names, gender, date_birth, status_at_registration status_registration, " +
                "address, phone, date_started, (SELECT date_visit date_last_clinic FROM pharmacy WHERE patient_id = p.id AND date_visit < ? AND " +
                "archived = false ORDER BY date_visit DESC LIMIT 1), (SELECT status FROM status_history WHERE patient_id = p.id AND date_status <= ? AND " +
                "archived = false ORDER BY date_status DESC LIMIT 1) FROM patient p JOIN pharmacy ph ON p.id = patient_id WHERE " +
                "p.facility_id = ? AND p.archived = false AND next_appointment BETWEEN ? AND ? AND p.archived = false " +
                ") as pl " +
                "WHERE id NOT IN (SELECT DISTINCT patient_id FROM pharmacy WHERE facility_id = ? AND date_visit BETWEEN ? AND ? " +
                "AND archived = false) AND status NOT IN ('KNOWN_DEATH', 'STOPPED_TREATMENT', 'ART_TRANSFER_OUT')";

        List<PatientVM> patients = jdbcTemplate.query(query, new BeanPropertyRowMapper<>(PatientVM.class), start, end, facilityId, start, end, facilityId, start, end);
        return new JRBeanCollectionDataSource(patients, false);
    }

    private JRBeanCollectionDataSource missedClinicAppointment(Long facilityId, LocalDate start, LocalDate end) {
        String query = "SELECT * FROM (" +
                "SELECT p.id, hospital_num, surname, other_names, gender, date_birth, status_at_registration status_registration, " +
                "address, phone, date_started, (SELECT date_visit date_last_clinic FROM clinic WHERE patient_id = p.id AND date_visit < ? AND " +
                "archived = false ORDER BY date_visit DESC LIMIT 1), (SELECT status FROM status_history WHERE patient_id = p.id AND date_status <= ? AND " +
                "archived = false ORDER BY date_status DESC LIMIT 1) FROM patient p JOIN pharmacy ph ON p.id = patient_id WHERE " +
                "p.facility_id = ? AND p.archived = false AND next_appointment BETWEEN ? AND ? AND p.archived = false " +
                ") as pl " +
                "WHERE id NOT IN (SELECT DISTINCT patient_id FROM clinic WHERE facility_id = ? AND date_visit BETWEEN ? AND ? " +
                "AND archived = false) AND status NOT IN ('KNOWN_DEATH', 'STOPPED_TREATMENT', 'ART_TRANSFER_OUT')";

        List<PatientVM> patients = jdbcTemplate.query(query, new BeanPropertyRowMapper<>(PatientVM.class), start, end, facilityId, start, end, facilityId, start, end);
        return new JRBeanCollectionDataSource(patients, false);
    }

    private JRBeanCollectionDataSource missedTrackingReturnAppointment(Long facilityId, LocalDate start, LocalDate end) {
        String query = "SELECT * FROM (" +
                "SELECT p.id, hospital_num, surname, other_names, gender, date_birth, status_at_registration status_registration, " +
                "address, phone, date_started, (SELECT date_visit date_last_clinic FROM pharmacy WHERE patient_id = p.id AND date_visit < ? AND " +
                "archived = false ORDER BY date_visit DESC LIMIT 1), (SELECT status FROM status_history WHERE patient_id = p.id AND date_status <= ? AND " +
                "archived = false ORDER BY date_status DESC LIMIT 1) FROM patient p JOIN status_history s ON p.id = patient_id WHERE " +
                "p.facility_id = ? AND p.archived = false AND date_agreed BETWEEN ? AND ? AND p.archived = false " +
                ") as pl " +
                "WHERE id NOT IN (SELECT DISTINCT patient_id FROM pharmacy WHERE facility_id = ? AND date_visit BETWEEN ? AND ? " +
                "AND archived = false UNION SELECT DISTINCT patient_id FROM clinic WHERE facility_id = ? AND date_visit BETWEEN ? AND ? " +
                "AND archived = false) AND status NOT IN ('KNOWN_DEATH', 'STOPPED_TREATMENT', 'ART_TRANSFER_OUT')";

        List<PatientVM> patients = jdbcTemplate.query(query, new BeanPropertyRowMapper<>(PatientVM.class), start, end, facilityId, start, end, facilityId, start, end, facilityId, start, end);
        return new JRBeanCollectionDataSource(patients, false);
    }
}
