# Phase 1: Patient Registration & Basic EMR

> **"Day 1"** — Every patient gets a digital identity; every encounter is recorded.

## 🎯 Goal

Replace paper-based patient registration with a digital system. This phase is the **foundation** for all subsequent phases — without patient identity and encounter records, nothing else works.

## 📦 Bahmni Modules Used

| Module | Purpose |
|---|---|
| **OpenMRS Registration** | Patient demographics, search, ID generation |
| **Bahmni Clinical** | Clinical encounters, observations, diagnoses |
| **Bed Management** | Ward and bed tracking |
| **Implementer Interface** | Custom observation form designer |

## 🔧 Configuration Steps

### Step 1: Create the Hospital Location Hierarchy

Configure the hospital structure via **Admin → Manage Locations** in OpenMRS:

```
Hospital San Juan de Dios
├── OPD (Outpatient Department)
├── Maternity Ward (20 beds)
├── Pediatrics Ward (15 beds)
├── Medical Ward (30 beds)
├── Surgical Ward (20 beds)
├── ICU (5 beds)
├── Emergency (10 beds)
├── Laboratory
├── Pharmacy
└── Administration
```

**Navigation**: http://localhost/openmrs/ → Administration → Manage Locations

### Step 2: Create User Accounts & Roles

| User | Role | Access Level |
|---|---|---|
| Dr. Koroma | Doctor (Provider) | Full clinical access (consultations, orders, diagnoses) |
| Dr. Sesay | Doctor (Provider) | Full clinical access |
| Dr. Bangura | Doctor (Provider) | Full clinical access |
| Nurse Conteh | Nurse | Triage, vital signs, nursing observations |
| Reception Kamara | Registration Clerk | Patient registration, search, appointments |
| Cashier Turay | Billing/Admin | Billing operations, administrative access |

**Navigation**: http://localhost/openmrs/ → Administration → Manage Users

### Step 3: Register Demo Patients

Create 20 patients with realistic demographics. See [demo-patients.md](../model-hospital/demo-patients.md) for profiles.

**Navigation**: http://localhost/bahmni/registration/ → Create New Patient

Key fields:
- **Patient Identifier** — auto-generated
- **Name**, Date of Birth, Gender
- **Address** (village, district)
- **Phone number** (if available)
- **Photo** (optional webcam capture)

### Step 4: Create Clinical Encounters

For each department, create at least one complete encounter:

#### OPD Encounter (Malaria case)
1. Patient arrives → Registration clerk searches / creates record
2. Nurse records **vital signs** at triage (temp: 39.2°C, BP: 110/70, HR: 98, RR: 22)
3. Doctor opens patient dashboard → starts **consultation**:
   - Chief complaint: "Fever for 3 days, headache, body aches"
   - Examination: "Febrile, mild dehydration"
   - Diagnosis: **B54 — Unspecified malaria** (ICD-10)
   - Disposition: "Admit to Medical Ward" or "Discharge"

#### Maternity Encounter (Antenatal visit)
1. Pregnant patient registered with pregnancy details
2. Vital signs + fundal height measurement via observation form
3. Assessment: **Z34.0 — Supervision of normal first pregnancy**

#### Pediatrics Encounter (Malnutrition screening)
1. Child patient with growth measurements (weight, height, MUAC)
2. Assessment: nutritional status evaluation
3. Diagnosis if applicable: **E46 — Unspecified protein-calorie malnutrition**

### Step 5: Configure Custom Observation Forms

Using the **Implementer Interface** (http://localhost/implementer-interface/), design the 18 hospital unit forms identified from the hospital's paper forms:

| Priority | Forms |
|---|---|
| **Priority 1** (daily use) | OPD, Emergency, General Ward, Maternity, Pediatrics |
| **Priority 2** (frequent) | Neonatal, Delivery, Death Note, ANC & Triage |
| **Priority 3** (specialized) | Theatre, Vaccine, X-Ray, Echo, Dressing, Abortion |
| **Priority 4** (administrative) | Bed State, Totals |

Each form is created as an **Observation Template** with:
- Form name and description
- Observation fields (text, numeric, coded/dropdown)
- Sections and layout
- Associated concepts in OpenMRS dictionary

### Step 6: Basic Reports (Phase 1)

Even at this early stage, the system can generate valuable reports:

| Report | What it shows | Value |
|---|---|---|
| **Patient demographics** | Age/sex distribution | Understand population served |
| **New registrations/week** | Adoption curve | Track rollout progress |
| **Top 10 diagnoses** | Most common conditions | Guide resource allocation |
| **Encounters by department** | Workload distribution | Staffing decisions |
| **Births registered/month** | Maternity activity | Maternal health indicators |

**Navigation**: http://localhost/bahmni/reports/ → Select report template

## 📸 Screenshots

*(Screenshots will be added during configuration)*

- [ ] Bahmni registration form (empty)
- [ ] Bahmni registration form (filled)
- [ ] Patient dashboard view
- [ ] Clinical consultation creation
- [ ] ICD-10 diagnosis selection
- [ ] Vital signs entry
- [ ] Patient search
- [ ] Custom observation form (Implementer Interface)
- [ ] User role configuration
- [ ] Basic demographics report

## 💡 What Doctors See

> The registration clerk opens **Bahmni Registration** (`/registration`), enters demographics (name, DOB, gender, address), and the system generates a unique patient identifier. The nurse records **vital signs** at triage through a clean, touch-friendly form. The doctor opens the **patient dashboard**, sees the complete medical history on a single timeline, and starts a new **consultation**. They record the chief complaint, add observations, select a **diagnosis** from the ICD-10 searchable dropdown, and set a disposition (admit/discharge/refer). Every interaction is timestamped and attributed to the logged-in provider.

## ✅ Advantages

| Before (Paper) | After (Bahmni Phase 1) |
|---|---|
| Patient records lost or misfiled | Permanent digital record, always accessible |
| Handwritten ID cards frequently lost | System-generated unique patient identifier |
| No way to check patient history | Complete medical timeline in the dashboard |
| Duplicate records for same patient | Search prevents duplicates |
| Illegible handwriting | Structured, typed data |
| No statistics possible | Instant demographic reports |
| Manual counting for reports | Automatic patient counts by diagnosis |

## 📚 References

- [Bahmni Registration Module](https://bahmni.atlassian.net/wiki/spaces/BAH/pages/registration)
- [Bahmni Clinical Module](https://bahmni.atlassian.net/wiki/spaces/BAH/pages/clinical)
- [Bahmni Implementer Interface](https://bahmni.atlassian.net/wiki/spaces/BAH/pages/implementer-interface)
- [ICD-10 Classification](https://icd.who.int/browse10/)

## ⏭️ Next Phase

Once Phase 1 is stable and staff are comfortable with registration and encounters, proceed to [Phase 2: Laboratory & Pharmacy](../phase-2-lab-pharmacy/README.md).
