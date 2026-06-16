# Phase 3: Billing & Administration

> **"Every service has a price"** — Financial sustainability through digital billing.

## 🎯 Goal

Implement service pricing, invoice generation, and financial reporting. This phase enables the hospital to track revenue, manage patient billing, and generate financial reports — critical for sustainability in resource-limited settings.

## 📦 Bahmni Modules Used

| Module | Purpose |
|---|---|
| **Odoo (Invoicing)** | Service pricing, invoice generation, payment tracking |
| **Odoo (Accounting)** | Financial reports, revenue analysis |
| **Bahmni Clinical** | Service ordering triggers billing in Odoo |

## 🔧 Configuration Steps

### Step 1: Configure Service Pricing

In Odoo (http://localhost:8069/), create a price list for hospital services:

| Category | Example Services | Price (SLE) |
|---|---|---|
| Consultation | OPD visit, Specialist consultation | 50–200 |
| Laboratory | Malaria RDT, Full blood count, Urinalysis | 30–150 |
| Pharmacy | Per medication (linked to stock) | Variable |
| Procedures | Wound dressing, Minor surgery | 100–500 |
| Inpatient | Bed per day (ward-dependent) | 200–1000 |

### Step 2: Invoice Generation Workflow

1. **Doctor** records services during consultation (diagnosis, procedures, lab orders)
2. **Bahmni** automatically creates draft invoice in Odoo
3. **Cashier** reviews and confirms invoice at billing counter
4. **Patient** pays (cash, mobile money, insurance)
5. Payment is recorded → invoice marked as paid

### Step 3: Financial Reports

Configure standard financial reports in Odoo:
- Daily revenue summary by department
- Outstanding invoices (unpaid)
- Revenue by service category
- Monthly financial statement

## 📸 Screenshots

- [ ] Service price list configuration (Odoo)
- [ ] Patient invoice (auto-generated)
- [ ] Cashier billing screen
- [ ] Daily revenue report
- [ ] Monthly financial summary

## 📚 References

- [Bahmni Billing Documentation](https://bahmni.atlassian.net/wiki/spaces/BAH/pages/billing)
- [Odoo Invoicing Documentation](https://www.odoo.com/documentation/17.0/applications/finance/accounting.html)

## ⏭️ Next Phase

Once billing is operational, proceed to [Phase 4: Reporting & Epidemiology](../phase-4-reporting/README.md).
