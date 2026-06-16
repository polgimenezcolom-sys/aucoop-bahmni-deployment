# Phase 2: Laboratory & Pharmacy

> **"Test and Treat"** — Lab results and medications flow digitally.

## 🎯 Goal

Integrate laboratory ordering/results and pharmacy management into the patient workflow established in Phase 1. Doctors can order lab tests from within a consultation, lab technicians process and report results digitally, and pharmacists dispense prescribed medications with automatic stock tracking.

## 📦 Bahmni Modules Used

| Module | Purpose |
|---|---|
| **OpenELIS** | Laboratory Information System — test ordering, sample tracking, results |
| **Odoo (Pharmacy)** | Medication catalog, stock management, dispensing |
| **Bahmni Clinical** | Lab order entry, prescription writing from consultation |

## 🔧 Configuration Steps

### Step 1: Configure Lab Test Catalog (OpenELIS)

Import the lab test catalog from [lab-tests.csv](../model-hospital/lab-tests.csv) into OpenELIS:

- **Access**: http://localhost:8052/ (OpenELIS admin)
- Create test panels (Hematology, Chemistry, Microbiology, Parasitology)
- Define tests with normal ranges, units, and result types
- Map tests to OpenMRS concepts for Bahmni integration

### Step 2: Lab Ordering Workflow

1. **Doctor** orders lab tests during consultation (Bahmni Clinical → Orders tab)
2. **Lab technician** receives orders in OpenELIS
3. Lab tech collects sample → processes test → enters results
4. **Results** automatically appear in the patient's Bahmni dashboard
5. Doctor reviews results in the patient timeline

### Step 3: Medication Catalog (Odoo)

Import medications from [medications.csv](../model-hospital/medications.csv) into Odoo:

- **Access**: http://localhost:8069/ (Odoo admin)
- Create product categories (Antimalarials, Antibiotics, Analgesics, etc.)
- Set up stock locations (Main Pharmacy, Ward dispensaries)
- Configure initial stock quantities

### Step 4: Prescription Workflow

1. **Doctor** prescribes medications during consultation (Bahmni Clinical → Medication tab)
2. **Pharmacist** sees prescription in Odoo
3. Pharmacist dispenses medications → stock is decremented
4. Patient receives medications
5. Stock alerts when quantities fall below threshold

## 📸 Screenshots

- [ ] Lab test order from clinical consultation
- [ ] OpenELIS test processing screen
- [ ] Lab results in patient dashboard
- [ ] Medication prescription form
- [ ] Odoo pharmacy dispensing
- [ ] Stock level dashboard

## 📚 References

- [Bahmni Lab Integration](https://bahmni.atlassian.net/wiki/spaces/BAH/pages/lab)
- [OpenELIS Documentation](https://openelis-global.org/)
- [Bahmni Odoo Integration](https://bahmni.atlassian.net/wiki/spaces/BAH/pages/odoo)

## ⏭️ Next Phase

Once lab and pharmacy workflows are stable, proceed to [Phase 3: Billing & Administration](../phase-3-billing/README.md).
