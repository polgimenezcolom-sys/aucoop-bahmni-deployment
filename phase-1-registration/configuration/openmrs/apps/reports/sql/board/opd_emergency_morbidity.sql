SELECT 
  v.name AS 'Visit Type',
  o.value_text AS 'Diagnosis / Morbidity',
  p.gender AS 'Gender',
  CASE 
    WHEN TIMESTAMPDIFF(YEAR, p.birthdate, o.obs_datetime) < 5 THEN 'Under 5'
    WHEN TIMESTAMPDIFF(YEAR, p.birthdate, o.obs_datetime) BETWEEN 5 AND 14 THEN '5-14'
    WHEN TIMESTAMPDIFF(YEAR, p.birthdate, o.obs_datetime) BETWEEN 15 AND 49 THEN '15-49'
    ELSE '50+'
  END AS 'Age Group',
  COUNT(DISTINCT o.person_id) AS 'Total Patients'
FROM obs o
INNER JOIN person p ON o.person_id = p.person_id AND p.voided = 0
INNER JOIN encounter e ON o.encounter_id = e.encounter_id AND e.voided = 0
INNER JOIN visit vi ON e.visit_id = vi.visit_id AND vi.voided = 0
INNER JOIN visit_type v ON vi.visit_type_id = v.visit_type_id
WHERE o.concept_id = 57517 -- SJD Morbidity
  AND o.voided = 0
  AND cast(o.obs_datetime as date) BETWEEN '#startDate#' AND '#endDate#'
GROUP BY v.name, o.value_text, p.gender, `Age Group`
ORDER BY v.name, `Total Patients` DESC;
