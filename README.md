# 📦 UPS WooCommerce E2E Automation

End‑to‑end test automation suite for the **PluginHive UPS Shipping plugin** running on a **WooCommerce / WordPress** store. Built with **Playwright + TypeScript**, it drives the WordPress admin UI, creates orders through the WooCommerce REST API, generates & prints real UPS shipping labels, and verifies both the outgoing UPS API payloads and the printed PDF/label contents.

<p align="left">
  <img alt="Playwright" src="https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white">
  <img alt="Node" src="https://img.shields.io/badge/Node-%3E%3D18-339933?logo=node.js&logoColor=white">
  <img alt="WooCommerce" src="https://img.shields.io/badge/WooCommerce-96588A?logo=woocommerce&logoColor=white">
  <img alt="CI" src="https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=github-actions&logoColor=white">
</p>

---

## ✨ Features

- **Page Object Model (POM)** architecture with Playwright custom fixtures — every page object is injected through a single `pages` fixture.
- **API-driven test data** — orders are created programmatically through the WooCommerce REST API using [`@faker-js/faker`](https://fakerjs.dev/) for synthetic customer data (no slow UI setup).
- **Semantic locators first** — `getByRole` / `getByLabel` / `getByText` over fragile CSS / XPath.
- **Deep verification** — asserts the actual **UPS API request payload** (service code, addresses, label format, return service) captured from plugin logs, plus **PDF / label content** parsed via `pdf-parse`.
- **Data-driven suites** — label generation is parametrized across every UPS service and every label type (GIF / PNG / ZPL / EPL).
- **Cross-browser** — Chrome, Firefox, and WebKit projects.
- **Reusable auth session** — logs in once and reuses the saved storage state across all tests.
- **CI ready** — GitHub Actions workflow runs the full suite and uploads the HTML report.

---

## 🧱 Tech Stack

| Purpose | Tool |
|---|---|
| E2E framework | [Playwright](https://playwright.dev/) (TypeScript) |
| Test data | [@faker-js/faker](https://fakerjs.dev/) |
| Order creation | WooCommerce REST API (`/wp-json/wc/v3/orders`) |
| PDF / label verification | [pdf-parse](https://www.npmjs.com/package/pdf-parse) |
| Config / secrets | [dotenv](https://www.npmjs.com/package/dotenv) |
| CI/CD | GitHub Actions |

---

## 📁 Project Structure

```
ups-woo-automation/
├── .github/workflows/playwright.yml     # CI pipeline
├── playwright.config.ts                 # Timeouts, projects, storageState, reporter
├── env_sample                           # Template for your .env file
├── src/
│   ├── api/
│   │   └── wooOrderApi.ts               # WooCommerce REST client — creates orders w/ Faker data
│   └── pages/                           # Page Object Model
│       ├── basePage.ts                  # Shared admin-menu navigation
│       ├── auth/loginPage.ts            # WordPress login locators & actions
│       ├── UPSplugin/settings.ts        # UPS plugin settings (packaging, label type, tabs)
│       ├── shop/shopPage.ts             # Storefront cart & checkout
│       └── wooCommerceAdmin/
│           ├── homePage.ts              # Admin dashboard
│           ├── ordersPage.ts            # Orders grid: label gen, bulk actions, void, return, print
│           └── status.ts                # UPS status / logs page
└── tests/
    ├── auth/auth.spec.ts                # Login setup → saves session to playwright/.auth/user.json
    ├── fixtures/fixtures.ts             # Custom `pages` fixture wiring all page objects
    ├── testData/
    │   ├── upsServiceCodes.ts           # UPS service name → code map
    │   └── shipmentLogs/shipmentVerifier.ts  # Asserts UPS API request payloads
    ├── labelGeneration/
    │   ├── allServicesLabelGeneration.spec.ts        # Every UPS service (data-driven)
    │   ├── labelTypeGeneration.spec.ts               # GIF / PNG / ZPL / EPL (data-driven)
    │   ├── bulkLabelGeneration.spec.ts               # 10 orders → combined PDF
    │   ├── singleLabelGenerationFromOrderSummary.spec.ts
    │   ├── singleLabelGenerationFromOrdersGrid.spec.ts
    │   └── singleLabelGenerationfromCheckout.spec.ts # (skipped)
    ├── ordersPage/
    │   ├── returnLabelGeneration.spec.ts
    │   └── voidShipment.spec.ts
    └── packaging/
        └── packItemsIndividually.spec.ts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js ≥ 18**
- A reachable WooCommerce store with the **PluginHive UPS Shipping** plugin configured
- WooCommerce REST API **consumer key & secret**

### 1. Install

```bash
git clone <repo-url>
cd ups-woo-automation
npm install          # postinstall runs `playwright install` to fetch browsers
```

### 2. Configure environment

Copy the sample and fill in your values:

```bash
cp env_sample .env
```

`.env` variables:

| Variable | Description |
|---|---|
| `site_url` | Base URL of the WooCommerce store |
| `userName` | WordPress admin username / email |
| `pass` | WordPress admin password |
| `CONSUMER_KEY` | WooCommerce REST API consumer key |
| `CONSUMER_SECRET` | WooCommerce REST API consumer secret |

> `.env`, the saved auth session (`playwright/.auth/user.json`), and reports are git‑ignored.

### 3. Authenticate

Run the login setup once to create the reusable session:

```bash
npx playwright test tests/auth/auth.spec.ts
```

---

## 🧪 Running Tests

```bash
# Run everything (all browsers)
npx playwright test

# One browser only
npx playwright test --project="google chrome"

# A single suite
npx playwright test tests/labelGeneration/bulkLabelGeneration.spec.ts

# Headed / debug / UI mode
npx playwright test --headed
npx playwright test --debug
npx playwright test --ui

# Open the last HTML report
npx playwright show-report
```

> Tests run **serially** (`workers: 1`, `fullyParallel: false`) because they mutate shared plugin settings and shared store state.

---

## 🔬 What the Tests Cover

| Suite | What it verifies |
|---|---|
| **All Services Label Generation** | Generates & prints a label for **every UPS service** in `upsServiceCodes`, asserting the UPS API payload and printed label per service |
| **Label Type Generation** | Sets label format to **GIF / PNG / ZPL / EPL** and verifies the generated label matches the format |
| **Bulk Label Generation** | Creates 10 orders, bulk-generates labels, downloads a **combined PDF** |
| **Single Label (Order Summary)** | Full single-order flow from the order summary panel |
| **Single Label (Orders Grid)** | Single-order flow via bulk actions on the orders grid |
| **Return Label Generation** | Generates a shipment then a **return label**, verifying both payloads |
| **Void Shipment** | Confirms a shipment, then voids it via client-side reset |
| **Pack Items Individually** | Sets packaging to *pack items individually* and asserts the expected **package count** |

Verification goes beyond UI assertions — `shipmentVerifier.ts` inspects the real **UPS `ShipmentRequest`** (transaction reference, service code, label image format, addresses, return service), and `pdf-parse` validates the printed label / PDF content.

---

## ⚙️ Configuration Notes

- **Browsers:** `google chrome`, `firefox`, `webkit` (see `playwright.config.ts`).
- **Base URL:** taken from `process.env.site_url`.
- **Timeout:** 60s global; label flows bump to 120s via `test.setTimeout()`.
- **Trace:** captured `on-first-retry`.
- **Retries:** 2 on CI, 0 locally.

---

## 🤖 Continuous Integration

`.github/workflows/playwright.yml` runs on every push / PR to `main` / `master`:

1. Checkout + Node (LTS)
2. `npm ci`
3. `npx playwright install --with-deps`
4. `npx playwright test`
5. Upload the `playwright-report/` artifact (30-day retention)

> CI requires the store `.env` secrets to be provided as repository / environment secrets.

---

## 🧭 Conventions

- Semantic locators first (`getByRole` / `getByLabel` / `getByText`); avoid XPath and `nth-child`.
- One reusable helper per repeated action; keep page objects modular.
- Prefer stable waits (`expect(...).toBeVisible()`, `waitForURL`) over fixed timeouts.
- New workflow? Add a spec under the relevant `tests/` folder, add page objects in `src/pages/`, and register them in `tests/fixtures/fixtures.ts`.

---

## 📌 Roadmap

The suite currently automates single / bulk / return / void label flows, label-type and all-service coverage, and individual packaging. A broader backlog (~55 cases) covers insurance, negotiated rates, access points, packaging algorithms, variable products, international shipments, duties / taxes, tracking, and rate edge cases — tracked internally and prioritized incrementally.
