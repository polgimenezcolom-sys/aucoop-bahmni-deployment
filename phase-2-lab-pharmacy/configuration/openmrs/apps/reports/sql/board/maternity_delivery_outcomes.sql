-- ============================================================================
-- REPORT QUERY: MATERNITY & DELIVERY OUTCOMES SUMMARY
-- Location: St. John of God Hospital (SJD), Sierra Leone
--
-- PURPOSE:
-- Summarizes delivery statistics, including delivery types, newborn outcomes 
-- (Alive, Fresh Stillbirth, Macerated Stillbirth), maternal deaths, and maternal morbidities.
--
-- DESIGN RATIONALE:
-- Focuses on 'SJD Delivery Type' (concept_id = 57627) as the primary driving concept,
-- then LEFT JOINs associated details: Outcome (57626), Maternal Death (57628), and
-- Maternal Morbidity (57629) from the same maternity encounter. This enables the board
-- to track key maternal and neonatal survival outcomes.
-- ============================================================================

SELECT 
  cn_type.name AS 'Delivery Method',
  cn_outcome.name AS 'Delivery Outcome',
  cn_maternal.name AS 'Maternal Death?',
  COALESCE(cn_morb.name, 'None') AS 'Maternal Morbidity',
  COUNT(DISTINCT o_type.person_id) AS 'Deliveries Count'
FROM obs o_type
INNER JOIN concept_name cn_type ON o_type.value_coded = cn_type.concept_id AND cn_type.concept_name_type = 'FULLY_SPECIFIED' AND cn_type.voided = 0
LEFT JOIN obs o_outcome ON o_type.encounter_id = o_outcome.encounter_id AND o_outcome.concept_id = 57626 AND o_outcome.voided = 0
LEFT JOIN concept_name cn_outcome ON o_outcome.value_coded = cn_outcome.concept_id AND cn_outcome.concept_name_type = 'FULLY_SPECIFIED' AND cn_outcome.voided = 0
LEFT JOIN obs o_maternal ON o_type.encounter_id = o_maternal.encounter_id AND o_maternal.concept_id = 57628 AND o_maternal.voided = 0
LEFT JOIN concept_name cn_maternal ON o_maternal.value_coded = cn_maternal.concept_id AND cn_maternal.concept_name_type = 'FULLY_SPECIFIED' AND cn_maternal.voided = 0
LEFT JOIN obs o_morb ON o_type.encounter_id = o_morb.encounter_id AND o_morb.concept_id = 57629 AND o_morb.voided = 0
LEFT JOIN concept_name cn_morb ON o_morb.value_coded = cn_morb.concept_id AND cn_morb.concept_name_type = 'FULLY_SPECIFIED' AND cn_morb.voided = 0
WHERE o_type.concept_id = 57627 -- SJD Delivery Type
  AND o_type.voided = 0
  AND cast(o_type.obs_datetime as date) BETWEEN '#startDate#' AND '#endDate#'
GROUP BY cn_type.name, cn_outcome.name, cn_maternal.name, cn_morb.name
ORDER BY `Deliveries Count` DESC;
