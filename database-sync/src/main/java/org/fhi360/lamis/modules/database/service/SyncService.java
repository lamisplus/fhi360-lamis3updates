package org.fhi360.lamis.modules.database.service;

import lombok.RequiredArgsConstructor;
import org.fhi360.lamis.modules.database.domain.entities.SyncTrigger;
import org.fhi360.lamis.modules.database.domain.repositories.SyncTriggerRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class SyncService {
    private final JdbcTemplate jdbcTemplate;
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final SyncTriggerRepository syncTriggerRepository;

    public void sync() {
        jdbcTemplate.execute("update sym_outgoing_batch set status ='OK'");

        List<String> nodeId = jdbcTemplate.queryForList("select node_id from sym_node_identity", String.class);
        if (!nodeId.isEmpty()) {
            String sync = "insert into SYM_TABLE_RELOAD_REQUEST (target_node_id, source_node_id, trigger_id, router_id, create_time, create_table, last_update_time)\\n\" +\n" +
                    " values ('000', '@', '#', 'facility_2_server', current_timestamp, 0, current_timestamp)";

            syncTriggerRepository.findAll().stream()
                    .sorted(Comparator.comparing(SyncTrigger::getPriority))
                    .forEach(syncTrigger -> {
                        jdbcTemplate.update(sync.replaceAll("@", nodeId.get(0)).replaceAll("#", syncTrigger.getTriggerId()));
                    });
        }

        ScheduledExecutorService service = Executors.newSingleThreadScheduledExecutor();
        Runnable runnable = () -> {
            if (!syncOngoing()) {
                syncTriggerRepository.findAll()
                        .forEach(syncTrigger -> {
                            syncTrigger.setStart(LocalDate.now());
                            syncTriggerRepository.save(syncTrigger);
                        });
                service.shutdown();
            }
        };

        service.scheduleAtFixedRate(runnable, 0, 2, TimeUnit.MINUTES);
    }

    public List<String> syncedTables() {
        return jdbcTemplate.queryForList("select distinct summary from sym_outgoing_batch where channel_id = 'reload' " +
                "and status = 'OK' order by 1", String.class);
    }

    public Boolean syncOngoing() {
        return jdbcTemplate.queryForObject("select count(*) > 0 from sym_outgoing_batch where channel_id = 'reload' " +
                "and status != 'OK'", Boolean.class);
    }

    public LocalDateTime lastHeartbeat() {
        return jdbcTemplate.queryForObject("select last_update_time from sym_outgoing_batch where channel_id = 'heartbeat' " +
                "and status = 'OK' and node_id = '000' order by last_update_time desc limit 1", LocalDateTime.class);
    }

    public LocalDateTime lastSuccessfulSync() {
        return jdbcTemplate.queryForObject("select last_update_time from sym_outgoing_batch where channel_id = 'reload' " +
                "and status = 'OK' and node_id = '000' order by last_update_time desc limit 1", LocalDateTime.class);
    }

    public void cleanupDatabase(List<Long> ids) {

        jdbcTemplate.update("drop trigger if exists soft_delete_clinic_adhere on clinic_adhere");
        jdbcTemplate.update("drop trigger if exists soft_delete_clinic_opportunistic_infection on clinic_opportunistic_infection");

        List<String> tables = Arrays.asList("status_history", "regimen_history", "child_followup", "child", "devolve",
                "tb_screen_history", "dm_screen_history", "oi_history", "adhere_history", "adr_history", "biometric",
                "chronic_care_dm", "chronic_care_tb", "chronic_care", "clinic_opportunistic_infection", "clinic_adverse_drug_reaction",
                "clinic_adhere", "clinic", "regimen_history", "laboratory_line", "laboratory", "pharmacy_line",
                "pharmacy_adverse_drug_reaction", "pharmacy", "eac", "eid", "nigqual", "patient_case_manager", "participant",
                "prescription", "maternal_followup", "mother_information", "index_contact", "drug_therapy", "encounter",
                "delivery", "anc", "appointment", "assessment", "case_manager", "patient", "hts");

        tables.forEach(table -> {
            SqlParameterSource parameterSource = new MapSqlParameterSource()
                    .addValue("facilities", ids);
            namedParameterJdbcTemplate.update(String.format("delete from %s where facility_id not in (:facilities)", table), parameterSource);
        });

        jdbcTemplate.update("CREATE TRIGGER soft_delete_clinic_adhere" +
                "    BEFORE DELETE ON clinic_adhere" +
                "    FOR EACH ROW EXECUTE PROCEDURE soft_delete();" +
                "CREATE TRIGGER soft_delete_clinic_opportunistic_infection" +
                "    BEFORE DELETE ON clinic_opportunistic_infection" +
                "    FOR EACH ROW EXECUTE PROCEDURE soft_delete();");
    }
}
