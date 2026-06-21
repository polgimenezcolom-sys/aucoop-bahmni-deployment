SELECT 
  cn_term.name AS 'Gestational Term',
  cn_diag.name AS 'Diagnosis',
  cn_feed.name AS 'Feeding Type',
  cn_method.name AS 'Feeding Method',
  cn_result.name AS 'Outcome Result',
  ROUND(AVG(o_w_adm.value_numeric), 0) AS 'Avg Adm Weight (g)',
  ROUND(AVG(o_w_dsc.value_numeric), 0) AS 'Avg Dsc Weight (g)',
  COUNT(DISTINCT o_term.person_id) AS 'Total Neonates'
FROM obs o_term
INNER JOIN concept_name cn_term ON o_term.value_coded = cn_term.concept_id AND cn_term.concept_name_type = 'FULLY_SPECIFIED' AND cn_term.voided = 0
LEFT JOIN obs o_diag ON o_term.encounter_id = o_diag.encounter_id AND o_diag.concept_id = 57617 AND o_diag.voided = 0
LEFT JOIN concept_name cn_diag ON o_diag.value_coded = cn_diag.concept_id AND cn_diag.concept_name_type = 'FULLY_SPECIFIED' AND cn_diag.voided = 0
LEFT JOIN obs o_feed ON o_term.encounter_id = o_feed.encounter_id AND o_feed.concept_id = 57620 AND o_feed.voided = 0
LEFT JOIN concept_name cn_feed ON o_feed.value_coded = cn_feed.concept_id AND cn_feed.concept_name_type = 'FULLY_SPECIFIED' AND cn_feed.voided = 0
LEFT JOIN obs o_method ON o_term.encounter_id = o_method.encounter_id AND o_method.concept_id = 57621 AND o_method.voided = 0
LEFT JOIN concept_name cn_method ON o_method.value_coded = cn_method.concept_id AND cn_method.concept_name_type = 'FULLY_SPECIFIED' AND cn_method.voided = 0
LEFT JOIN obs o_result ON o_term.encounter_id = o_result.encounter_id AND o_result.concept_id = 57622 AND o_result.voided = 0
LEFT JOIN concept_name cn_result ON o_result.value_coded = cn_result.concept_id AND cn_result.concept_name_type = 'FULLY_SPECIFIED' AND cn_result.voided = 0
LEFT JOIN obs o_w_adm ON o_term.encounter_id = o_w_adm.encounter_id AND o_w_adm.concept_id = 57548 AND o_w_adm.voided = 0
LEFT JOIN obs o_w_dsc ON o_term.encounter_id = o_w_dsc.encounter_id AND o_w_dsc.concept_id = 57550 AND o_w_dsc.voided = 0
WHERE o_term.concept_id = 57616 -- SJD Neonatal Term
  AND o_term.voided = 0
  AND cast(o_term.obs_datetime as date) BETWEEN '#startDate#' AND '#endDate#'
GROUP BY cn_term.name, cn_diag.name, cn_feed.name, cn_method.name, cn_result.name
ORDER BY `Total Neonates` DESC;
