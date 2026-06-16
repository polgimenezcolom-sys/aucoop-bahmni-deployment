# AUCOOP Bahmni Deployment — Phased Hospital Digitalization

> **Master's Thesis Project** — Universitat Politècnica de Catalunya (UPC)  
> Progressive deployment of [Bahmni](https://www.bahmni.org/) for resource-limited hospitals  
> Based on the real-world case of **St. John of God Hospital**, Lunsar, Sierra Leone

## 🎯 Purpose

This repository demonstrates a **phased approach to hospital digitalization** using Bahmni, an open-source Hospital Information System built on OpenMRS, Odoo, and OpenELIS. It serves as both:

1. **A practical deployment guide** — step-by-step instructions to configure Bahmni for a 100-bed hospital
2. **A thesis reference implementation** — reproducible configurations with annotated screenshots

This is the **Bahmni counterpart** to the [GNU Health deployment](https://github.com/polgimenezcolom-sys/aucoop-gnuhealth-deployment), enabling a side-by-side comparison of both platforms in the thesis.

The deployment follows the [WHO Digital Transformation Handbook](https://www.who.int/publications/i/item/9789240010567) recommendation of beginning with patient registration and progressively activating clinical, pharmacy, billing, and reporting modules.

## 🏥 Model Hospital

| Attribute | Value |
|---|---|
| **Name** | Hospital San Juan de Dios (St. John of God) |
| **Location** | Lunsar, Sierra Leone |
| **Size** | 100 beds |
| **Departments** | OPD, Maternity, Pediatrics, Laboratory, Pharmacy, Administration |
| **Staff** | 3 doctors, 15 nurses, 2 lab techs, 2 pharmacy staff, 1 admin, 1 IT officer |
| **Platform** | Bahmni Standard (Docker) — OpenMRS + Odoo + OpenELIS |

## 📋 Phases

Each phase represents a real-world deployment milestone. Phases build progressively on the same Bahmni instance — use Git tags to see the system state at each milestone.

| Phase | Name | Git Tag | Description |
|---|---|---|---|
| **Phase 1** | Registration & Basic EMR | `phase-1-complete` | Patient identity, clinical encounters, basic demographics reporting |
| **Phase 2** | Laboratory & Pharmacy | `phase-2-complete` | Lab ordering/results (OpenELIS), medication management (Odoo), stock tracking |
| **Phase 3** | Billing & Administration | `phase-3-complete` | Service pricing (Odoo), invoicing, inpatient management, financial reporting |
| **Phase 4** | Reporting & Epidemiology | `phase-4-complete` | Epidemiological surveillance, dashboards, DHIS2 integration notes |

> **Each phase includes mini-reports** that demonstrate immediate value from the data collected.

## 🚀 Quick Start

### Prerequisites
- Windows 10/11 with Docker Desktop (WSL2 backend)
- External SSD with 20+ GB free space
- 8+ GB RAM (24 GB recommended for running alongside GNU Health)

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/polgimenezcolom-sys/aucoop-bahmni-deployment.git

# 2. Follow the installation guide
cd aucoop-bahmni-deployment/install
cat README.md

# 3. Start Bahmni (from bahmni-docker directory)
docker compose up -d

# 4. Wait ~15-25 minutes for first initialization
# 5. Open http://localhost/ (superman / Admin123)
```

### Phase Configuration
```bash
# Follow each phase guide in order
cd phase-1-registration && cat README.md
cd phase-2-lab-pharmacy && cat README.md
cd phase-3-billing && cat README.md
cd phase-4-reporting && cat README.md
```

## 📂 Repository Structure

```
aucoop-bahmni-deployment/
├── README.md                        # This file
├── LICENSE                          # GPL-3.0
├── model-hospital/                  # Shared reference data (same as GNU Health repo)
│   ├── hospital-profile.md          # Hospital specification
│   ├── medications.csv              # WHO Essential Medicines subset
│   ├── lab-tests.csv                # Common lab tests + normal ranges
│   └── demo-patients.md             # Demo patient profiles
├── install/                         # Docker-based installation guide
├── phase-1-registration/            # Phase 1: Registration & EMR
├── phase-2-lab-pharmacy/            # Phase 2: Lab & Pharmacy
├── phase-3-billing/                 # Phase 3: Billing & Admin
├── phase-4-reporting/               # Phase 4: Reporting & Epi
└── docs/                            # Architecture & bibliography
```

## 🔄 Comparison with GNU Health

This repo is designed for **direct comparison** with the [GNU Health deployment](https://github.com/polgimenezcolom-sys/aucoop-gnuhealth-deployment):

| Aspect | GNU Health | Bahmni |
|---|---|---|
| Installation | Native (WSL2 / openSUSE) | Docker Compose |
| Architecture | Tryton ERP + PostgreSQL | OpenMRS + Odoo + OpenELIS + MySQL/PostgreSQL |
| Web Client | Tryton SAO | Bahmni EMR (Angular) |
| Form Designer | Tryton XML views | Implementer Interface (visual) |
| Lab Module | health_lab (built-in) | OpenELIS (separate service) |
| Pharmacy | health_stock (built-in) | Odoo (separate service) |
| RAM Usage | ~1-2 GB | ~6-8 GB |

## 📚 References

- [Bahmni Documentation](https://bahmni.atlassian.net/wiki/spaces/BAH/overview) — Official docs
- [Bahmni Docker Repository](https://github.com/Bahmni/bahmni-docker) — Installation
- [OpenMRS Wiki](https://wiki.openmrs.org/) — EMR documentation
- [WHO Essential Medicines List](https://www.who.int/groups/expert-committee-on-selection-and-use-of-essential-medicines/essential-medicines-lists)
- [ICD-10 Classification](https://icd.who.int/browse10/)
- [WHO Digital Health Guidelines](https://www.who.int/publications/i/item/9789240010567)

## 📄 License

This project is licensed under the GNU General Public License v3.0 — see [LICENSE](LICENSE) for details.

Bahmni is developed by [Bahmni Coalition](https://www.bahmni.org/) with support from [ThoughtWorks](https://www.thoughtworks.com/).

## 👤 Author

Pol Gibert — MSc Telecommunications Engineering, UPC Barcelona  
AUCOOP (Associació per a la Universitat, la Cooperació i el Desenvolupament)
