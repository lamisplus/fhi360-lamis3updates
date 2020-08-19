package org.fhi360.lamis.modules.database.util;

import org.jumpmind.db.model.Table;
import org.jumpmind.symmetric.io.data.CsvData;
import org.jumpmind.symmetric.io.data.DataContext;
import org.jumpmind.symmetric.io.data.writer.DatabaseWriterFilterAdapter;
import org.lamisplus.modules.base.config.ContextProvider;
import org.springframework.jdbc.core.JdbcTemplate;

public class OrphanedRecordFilter extends DatabaseWriterFilterAdapter {

    private static JdbcTemplate jdbcTemplate = ContextProvider.getBean(JdbcTemplate.class);

    @Override
    public boolean beforeWrite(DataContext context, Table table, CsvData data) {
        try {
            String[] parsedData = data.getParsedData(CsvData.ROW_DATA);
            int idx = table.getColumnIndex("patient_id");
            if (idx == -1) {
                return true;
            }
            idx = table.getColumnIndex("facility_id");
            if (idx == -1) {
                return true;
            }
            String patientId = parsedData[table.getColumnIndex("patient_id")];
            String facilityId = parsedData[table.getColumnIndex("patient_id")];
            boolean write = jdbcTemplate.queryForObject("select count(*) > 0 from patient where facility_id = ? and id = ?",
                    Boolean.class, facilityId, patientId);

            idx = table.getColumnIndex("mother_id");
            if (idx == -1) {
                return write;
            }
            String motherId = parsedData[table.getColumnIndex("mother_id")];
            write = jdbcTemplate.queryForObject("select count(*) > 0 from mother_information where facility_id = ? and id = ?",
                    Boolean.class, facilityId, motherId);
            idx = table.getColumnIndex("child_id");
            if (idx == -1) {
                return write;
            }
            String childId = parsedData[table.getColumnIndex("child_id")];
            return jdbcTemplate.queryForObject("select count(*) > 0 from child where facility_id = ? and id = ?",
                    Boolean.class, facilityId, childId);
        } catch (Exception e) {
            return false;
        }
    }
}
