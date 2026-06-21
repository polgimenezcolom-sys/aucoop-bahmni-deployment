SELECT 
  cn_action.name AS 'Ward Action',
  COALESCE(cn_dest.name, 'Default Ward') AS 'Destination Ward',
  p.gender AS 'Gender',
  COUNT(DISTINCT o.person_id) AS 'Total Patients'
FROM obs o
INNER JOIN person p ON o.person_id = p.person_id AND p.voided = 0
INNER JOIN concept_name cn_action ON o.value_coded = cn_action.concept_id AND cn_action.concept_name_type = 'FULLY_SPECIFIED' AND cn_action.voided = 0
LEFT JOIN obs o_dest ON o.encounter_id = o_dest.encounter_id AND o_dest.concept_id = 57512 AND o_dest.voided = 0
LEFT JOIN concept_name cn_dest ON o_dest.value_coded = cn_dest.concept_id AND cn_dest.concept_name_type = 'FULLY_SPECIFIED' AND cn_dest.voided = 0
WHERE o.concept_id = 57510 -- SJD Ward Action
  AND o.voided = 0
  AND cast(o.obs_datetime as date) BETWEEN '#startDate#' AND '#endDate#'
GROUP BY cn_action.name, `Destination Ward`, p.gender
ORDER BY cn_action.name, `Total Patients` DESC;
