-- ============================================================================
-- REPORT QUERY: MORTALITY & CAUSE OF DEATH SUMMARY
-- Location: St. John of God Hospital (SJD), Sierra Leone
--
-- PURPOSE:
-- Summarizes patient deaths by department/ward unit, patient gender, age group, 
-- cause of death, and the average hours elapsed from admission to death.
--
-- DESIGN RATIONALE:
-- Focuses on 'SJD Death Note Death Datetime' (concept_id = 57578) as the primary indicator
-- of a mortality event. It joins:
-- - Reporting Unit (57631)
-- - Admission Datetime (57577) to calculate time-to-death duration using TIMESTAMPDIFF
-- - Morbidity/Cause of Death (57517)
-- This critical report allows the board to monitor quality of care, response times, and
-- major mortality causes.
-- ============================================================================

SELECT 
  cn_unit.name AS 'Reporting Department / Unit',
  p.gender AS 'Gender',
  CASE 
    WHEN TIMESTAMPDIFF(YEAR, p.birthdate, o_death.obs_datetime) < 5 THEN 'Under 5'
    WHEN TIMESTAMPDIFF(YEAR, p.birthdate, o_death.obs_datetime) BETWEEN 5 AND 14 THEN '5-14'
    WHEN TIMESTAMPDIFF(YEAR, p.birthdate, o_death.obs_datetime) BETWEEN 15 AND 49 THEN '15-49'
    ELSE '50+'
  END AS 'Age Group',
  o_morb.value_text AS 'Cause of Death (Morbidity)',
  ROUND(AVG(TIMESTAMPDIFF(HOUR, o_adm.value_datetime, o_death.value_datetime)), 1) AS 'Avg Hours: Admission to Death',
  COUNT(DISTINCT o_death.person_id) AS 'Total Deaths'
FROM obs o_death
INNER JOIN person p ON o_death.person_id = p.person_id AND p.voided = 0
LEFT JOIN obs o_unit ON o_death.encounter_id = o_unit.encounter_id AND o_unit.concept_id = 57631 AND o_unit.voided = 0
LEFT JOIN concept_name cn_unit ON o_unit.value_coded = cn_unit.concept_id AND cn_unit.concept_name_type = 'FULLY_SPECIFIED' AND cn_unit.voided = 0
LEFT JOIN obs o_adm ON o_death.encounter_id = o_adm.encounter_id AND o_adm.concept_id = 57577 AND o_adm.voided = 0
LEFT JOIN obs o_morb ON o_death.encounter_id = o_morb.encounter_id AND o_morb.concept_id = 57517 AND o_morb.voided = 0
WHERE o_death.concept_id = 57578 -- SJD Death Note Death Datetime
  AND o_death.voided = 0
  AND cast(o_death.obs_datetime as date) BETWEEN '#startDate#' AND '#endDate#'
GROUP BY cn_unit.name, p.gender, `Age Group`, o_morb.value_text
ORDER BY `Total Deaths` DESC;
