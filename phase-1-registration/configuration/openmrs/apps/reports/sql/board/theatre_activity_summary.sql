SELECT 
  cn_type.name AS 'Surgical Type',
  cn_reason.name AS 'Surgical Reason',
  o_proc.value_text AS 'Procedure Name',
  COUNT(DISTINCT o_type.person_id) AS 'Total Surgeries'
FROM obs o_type
INNER JOIN concept_name cn_type ON o_type.value_coded = cn_type.concept_id AND cn_type.concept_name_type = 'FULLY_SPECIFIED' AND cn_type.voided = 0
LEFT JOIN obs o_reason ON o_type.encounter_id = o_reason.encounter_id AND o_reason.concept_id = 57513 AND o_reason.voided = 0
LEFT JOIN concept_name cn_reason ON o_reason.value_coded = cn_reason.concept_id AND cn_reason.concept_name_type = 'FULLY_SPECIFIED' AND cn_reason.voided = 0
LEFT JOIN obs o_proc ON o_type.encounter_id = o_proc.encounter_id AND o_proc.concept_id = 57519 AND o_proc.voided = 0
WHERE o_type.concept_id = 57514 -- SJD Theatre Type
  AND o_type.voided = 0
  AND cast(o_type.obs_datetime as date) BETWEEN '#startDate#' AND '#endDate#'
GROUP BY cn_type.name, cn_reason.name, o_proc.value_text
ORDER BY `Total Surgeries` DESC;
