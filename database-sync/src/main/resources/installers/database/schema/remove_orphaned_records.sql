CREATE OR REPLACE FUNCTION remove_orphaned_records() RETURNS VOID AS $$
	DECLARE
		t VARCHAR;
		c VARCHAR;
    BEGIN
        delete from clinic_opportunistic_infection where clinic_id in (select id from clinic where facility_id != (select facility_id from patient where id = patient_id));
        delete from clinic_adverse_drug_reaction where clinic_id in (select id from clinic where facility_id != (select facility_id from patient where id = patient_id));
        delete from clinic_adhere where clinic_id in (select id from clinic where facility_id != (select facility_id from patient where id = patient_id));
        delete from pharmacy_adverse_drug_reaction where pharmacy_id in (select id from pharmacy where facility_id != (select facility_id from patient where id = patient_id));
        delete from chronic_care_dm where chronic_care_id in (select id from chronic_care where facility_id != (select facility_id from patient where id = patient_id));
        delete from chronic_care_tb where chronic_care_id in (select id from chronic_care where facility_id != (select facility_id from patient where id = patient_id));

        FOR t IN SELECT unnest(ARRAY['status_history', 'regimen_history', 'child', 'devolve',
                'tb_screen_history', 'dm_screen_history', 'oi_history', 'adhere_history', 'adr_history',
                'chronic_care', 'clinic', 'regimen_history', 'laboratory_line', 'laboratory', 'pharmacy_line',
                'pharmacy', 'eac', 'nigqual', 'patient_case_manager', 'prescription', 'maternal_followup',
				'mother_information', 'drug_therapy', 'encounter', 'delivery', 'anc', 'appointment', 'partner_information'])
		LOOP
        	EXECUTE FORMAT('delete from %s t where facility_id != (select facility_id from patient where id = t.patient_id)', t);
		END LOOP;

		FOR t IN SELECT unnest(ARRAY['child'])
		LOOP
        	EXECUTE FORMAT('delete from %s t where facility_id != (select facility_id from mother_information where id = t.mother_id)', t);
		END LOOP;

		FOR t IN SELECT unnest(ARRAY['child_followup'])
		LOOP
        	EXECUTE FORMAT('delete from %s t where facility_id != (select facility_id from child where id = t.child_id)', t);
		END LOOP;
    END;
$$
LANGUAGE PLPGSQL;

SELECT remove_orphaned_records();
