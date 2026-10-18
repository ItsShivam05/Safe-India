# SafeIndia

> **Know what to do when it matters.**

SafeIndia is an India-focused public-safety and emergency-awareness web application. It provides practical, scenario-based emergency guidance, verified national helpline directories, and an interactive discovery tool to find nearby police stations, hospitals, clinics, and fire stations across India.

---

## Table of Contents

- [Overview](#overview)
- [Screenshots & Demo](#screenshots--demo)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture & Project Structure](#architecture--project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Local Development](#installation--local-development)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [How the Application Works](#how-the-application-works)
- [External Services & Data Sources](#external-services--data-sources)
- [Privacy & Safety Model](#privacy--safety-model)
- [Deployment](#deployment)
- [Testing & Quality Verification](#testing--quality-verification)
- [Known Limitations](#known-limitations)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Overview

During emergencies, accidents, or cybercrime incidents, people need immediate, clear, and actionable steps rather than legal text or complex menus. SafeIndia is built around a single question:

> *"Something has happened. What should I do right now?"*

The application operates entirely client-side without user accounts, authentication walls, or tracking. It combines structured emergency protocols, prevention checklists, verified Indian national helplines, and an interactive Leaflet map that queries OpenStreetMap data to locate nearby emergency services in real time.

---

## Screenshots & Demo

<!--
  To add application screenshots:
  1. Capture screenshots of the Homepage and Get Help Near Me map view.
  2. Save them to the repository (e.g. docs/screenshots/ or public/).
  3. Replace the placeholder paths below with relative repository paths.
-->

| Homepage & Emergency Guidance | Get Help Near Me (Interactive Map) |
|:---:|:---:|
| ![SafeIndia Homepage](public/safeindia-logo.png) | *(Add screenshot: `docs/screenshots/nearme-map.png`)* |

> **Live Demo:** *A production deployment URL is not yet configured for this repository. Follow the [Installation & Local Development](#installation--local-development) instructions below to run the application locally.*

---

## Key Features

### 1. Scenario-Based Emergency Protocols
- Immediate, step-by-step guidance organized into **Do Now**, **Do Not Do**, and **After the Immediate Threat**:
  - **Personal Safety**: Stalking, harassment, unsafe transit or ride situations.
  - **Medical Emergencies**: Unconscious patient (CPR basics), severe bleeding, choking, seizures, burns.
  - **Fire & Gas Safety**: Building fire evacuation, kitchen LPG cylinder leakage.
  - **Road & Transport**: Road traffic collisions, bystander assistance under India's Good Samaritan guidelines.
  - **Digital & Financial Fraud**: Unauthorized UPI transactions, OTP scams, stolen smartphone (CEIR IMEI block).
  - **Animal Hazards**: Snakebites (anti-snake venom protocol), stray dog bites and rabies wound management.

### 2. Get Help Near Me (Live Facility Discovery)
- **On-Demand Geolocation**: Requests device GPS location strictly upon user interaction.
- **Manual Indian Location Search**: Search by Indian city name, area, or 6-digit postal PIN code via OpenStreetMap Nominatim.
- **Nearby Emergency Facilities**: Locates police stations, hospitals, clinics, and fire stations using the OpenStreetMap Overpass API.
- **Interactive Leaflet Map**:
  - Color-coded category markers (Police: Blue, Hospital: Emerald, Fire Station: Orange).
  - Smooth camera pan and zoom on facility selection.
  - Interactive popups with facility name, category, straight-line distance, address, dial button, and directions link.
  - Floating map legend and attribution controls.
- **Distance-Sorted Results**: Straight-line distance calculated using the Haversine formula.
- **Direct Navigation Links**: One-click directions link opening coordinates directly in Google Maps.
- **Category Filtering & Radius Selection**: Filter by facility category (`All`, `Police`, `Hospitals`, `Fire`) and expand search radius (`5 km`, `10 km`, `20 km`).

### 3. National Emergency Access (112 Integration)
- Persistent top emergency bar with direct **Call 112 National Emergency** action.
- Dedicated **112 Emergency Banner** on the "Get Help Near Me" page with verified information on the Emergency Response Support System (ERSS).
- Floating **Quick Help** drawer on non-map pages for rapid dialing of key national numbers (112, 1930, 108, 1091).

### 4. Safety Awareness Guides
- Practical checklists and preventive habits:
  - Situational awareness and late-night commuting safety.
  - Digital fraud awareness (UPI payment traps, fake job offers, phishing).
  - Home fire, electrical, and LPG cylinder safety.
  - Natural disaster preparedness (earthquake and flood go-bag checklists).

### 5. Verified Official Resources Directory
- Structured directory of official Indian emergency helplines:
  - **112**: National Emergency Response System (Police, Fire, Medical, Rescue)
  - **1930**: National Cyber Crime Reporting Portal & Helpline (Financial Fraud)
  - **108 / 102**: Emergency Medical Ambulance Service
  - **1091 / 181**: Women Helpline (24/7 Distress Support)
  - **1098**: Childline India
  - **101**: Fire Emergency Services
  - **14416**: Tele-MANAS Mental Health Support
  - **1078 / 1070**: National Disaster Management Authority (NDMA)
  - **139**: Indian Railways Rail Madad Helpline
  - **1906**: LPG Cooking Gas Leak Emergency Helpline
- Each entry includes service description, 1-tap phone dial trigger, copy-to-clipboard button, and official portal link.

### 6. Client-Side AI Protocol Matcher & Global Search
- Natural-language emergency query matcher (e.g. *"someone is following me near metro"*, *"money debited via UPI scam"*).
- Matches queries to verified in-app emergency scenarios client-side without external API calls or hallucination risk.
- Global instant search modal accessible via keyboard shortcut (`Ctrl+K` or `⌘K`).

### 7. Responsive, English-Only Interface
- Built with a tailored Midnight Plum (`#211D35`), Primary Plum (`#65558F`), Soft Lavender (`#D9C8F0`), and Warm Ivory (`#F7F2EA`) design system.
- Fully responsive across desktop, tablet, and mobile viewports.
- Standardized entirely in English for consistent crisis comprehension.

---

## Technology Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **UI Framework** | [React](https://react.dev/) | `^19.2.8` | Declarative component hierarchy and reactive state management |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `~6.0.2` | Static typing, interface contracts, and compile-time validation |
| **Bundler & Dev Server** | [Vite](https://vitejs.dev/) | `^8.3.0` | Hot module replacement (HMR) and optimized production bundle |
| **CSS & Design System** | [Tailwind CSS](https://tailwindcss.com/) | `^3.4.19` | Utility-first styling with custom palette tokens |
| **CSS Post-Processing** | [PostCSS](https://postcss.org/) & [Autoprefixer](https://github.com/postcss/autoprefixer) | `^8.5.28` | CSS vendor prefixing and transformations |
| **Interactive Maps** | [Leaflet](https://leafletjs.com/) | `^1.9.4` | Interactive tile rendering, div-icon markers, bounds, and popups |
| **Map Type Definitions** | `@types/leaflet` | `^1.9.22` | Type declarations for Leaflet map instances and layers |
| **Iconography** | [Lucide React](https://lucide.dev/) | `^1.52.0` | Accessible SVG icon components |
| **Transitions** | [Framer Motion](https://www.framer.com/motion/) | `^14.0.0` | Modal transitions and micro-animations |
| **Linter** | [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) | `^1.81.0` | High-speed Rust-based JavaScript/TypeScript linter |
| **Geocoding Service** | [OpenStreetMap Nominatim](https://nominatim.org/) | API v1 | Free-text search for Indian cities, areas, and PIN codes |
| **Amenity Discovery** | [Overpass API](https://overpass-api.de/) | QL API | Spatial queries for nearby emergency facilities |
| **Map Tile Provider** | [OpenStreetMap](https://www.openstreetmap.org/) | Standard Tiles | Base map visual tiles (`tile.openstreetmap.org`) |

---

## Architecture & Project Structure

```text
SafeIndia/
├── public/
│   ├── favicon.svg                # Application browser icon
│   ├── safeindia-logo.png         # Brand logo asset
│   └── illustrations/             # High-resolution editorial illustrations
│       ├── hero_confident_commute.jpg
│       ├── community_support.jpg
│       ├── emergency_responders.jpg
│       └── safety_preparedness.jpg
├── src/
│   ├── assets/                    # Bundled graphic assets
│   ├── components/                # UI components
│   │   ├── nearme/                # "Get Help Near Me" sub-application
│   │   │   ├── HelpNearMeView.tsx # Main discovery container, state, and coordination
│   │   │   ├── HelpMap.tsx        # Leaflet map instance, tile layers, and custom markers
│   │   │   ├── EmergencyBanner.tsx# Prominent Call 112 emergency card
│   │   │   ├── LocationSearch.tsx # Nominatim search input with dropdown suggestions
│   │   │   ├── ResourceCard.tsx   # Facility list item card with dial and directions actions
│   │   │   └── ResourceFilters.tsx# Category tabs and radius selector
│   │   ├── AIProtocolMatcher.tsx  # Natural language scenario matcher
│   │   ├── AboutView.tsx          # About SafeIndia and mission principles
│   │   ├── AwarenessView.tsx      # Prevention guides and preparedness checklists
│   │   ├── EmergenciesView.tsx    # Emergency scenarios catalog with category filters
│   │   ├── Footer.tsx             # Footer with disclaimers and navigation links
│   │   ├── Hero.tsx               # Homepage hero section with quick action buttons
│   │   ├── MobileQuickAccess.tsx  # Persistent emergency quick-dial drawer
│   │   ├── Navbar.tsx             # Top navigation bar and 112 emergency trigger
│   │   ├── Philosophy.tsx         # Before / During / After safety philosophy cards
│   │   ├── ResourcesView.tsx      # Directory of verified national helplines
│   │   ├── ScenarioDetailView.tsx # Step-by-step emergency protocol detail screen
│   │   └── SearchModal.tsx        # Global instant search modal (Cmd+K / Ctrl+K)
│   ├── data/                      # Structured static emergency content
│   │   ├── awareness.ts           # Preparedness guides data
│   │   ├── emergencies.ts         # Emergency scenarios and step-by-step instructions
│   │   ├── locales.ts             # English translation strings and UI dictionary
│   │   └── resources.ts           # National official helplines directory
│   ├── services/                  # External API integration and utility logic
│   │   ├── locationService.ts     # Geolocation wrapper, Nominatim geocoder, Haversine distance
│   │   └── overpassService.ts     # Overpass QL generator, multi-endpoint failover, OSM parser
│   ├── types/                     # Shared TypeScript contracts
│   │   └── index.ts               # Coordinates, facilities, scenarios, and filter types
│   ├── App.tsx                    # Top-level view orchestrator and navigation state
│   ├── index.css                  # Tailwind directives and custom animation classes
│   └── main.tsx                   # React 19 entry point and DOM mounting
├── .oxlintrc.json                 # Oxlint configuration
├── index.html                     # HTML5 entry template (English document language)
├── package.json                   # Dependencies, scripts, and project metadata
├── postcss.config.js              # PostCSS plugin pipeline
├── tailwind.config.js             # Design tokens and custom theme extension
├── tsconfig.json                  # TypeScript workspace configuration
└── vite.config.ts                 # Vite bundler and React plugin configuration
```

### Facility Discovery Flow

```
[ User Action ]
      │
      ├──> "Use My Location" ──> locationService.getCurrentLocation() ──> Browser GPS
      │
      └──> Manual Search ────> locationService.searchLocation() ────────> Nominatim API
                                                                                │
                                                                     [ Lat, Lon Coordinates ]
                                                                                │
                                                                                ▼
                                                                overpassService.findNearbyFacilities()
                                                                                │
                                                                 Overpass API (with server failover)
                                                                                │
                                                                     [ Raw OSM Amenity Nodes ]
                                                                                │
                                                                                ▼
                                                                  Parse tags, phone, address
                                                                  Calculate Haversine distance
                                                                  Sort nearest-first
                                                                                │
                                                  ┌─────────────────────────────┴────────────────────────────┐
                                                  ▼                                                          ▼
                                        [ Distance-Sorted List ]                                    [ Leaflet Map View ]
                                        • Straight-line distance                                    • Color-coded markers
                                        • Formatted address                                         • User location ping
                                        • One-tap phone dial                                        • Dynamic popups
                                        • Google Maps directions                                    • Auto-fit bounds
```

---

## Prerequisites

Before setting up SafeIndia locally, ensure your environment has:

1. **Node.js**: `v18.x`, `v20.x`, or higher (LTS recommended).
2. **npm**: `v9.x` or higher (bundled with Node.js).
3. **Git**: Installed and available in your terminal path.
4. **Internet Connection**: Required during development to fetch OpenStreetMap tiles, Nominatim geocoding results, and Overpass facility data.

---

## Installation & Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/ItsShivam05/Safe-India.git
cd Safe-India
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The Vite dev server will start instantly. Open your browser and navigate to:

```
http://localhost:5173/
```

---

## Environment Configuration

SafeIndia **does not require any environment variables or API keys**.

- All map visual tiles are requested directly from public OpenStreetMap tile servers.
- Geocoding queries use the public OpenStreetMap Nominatim endpoint.
- Facility discovery uses public OpenStreetMap Overpass API mirrors.
- No `.env` file is required to develop, build, or deploy the application.

---

## Available Scripts

The following scripts are defined in `package.json`:

| Command | Action | Description |
|---|---|---|
| `npm run dev` | `vite` | Starts the local development server with Hot Module Replacement (HMR) at `http://localhost:5173/`. |
| `npm run build` | `tsc -b && vite build` | Runs full TypeScript compiler checks across all project references, then bundles optimized production assets into `dist/`. |
| `npm run lint` | `oxlint` | Runs fast static code analysis across all `.ts` and `.tsx` files using Oxlint. |
| `npm run preview` | `vite preview` | Boots a local static server to preview the production build generated in `dist/`. |

---

## How the Application Works

1. **Landing & Guidance**:
   The user opens SafeIndia and can immediately browse common Indian emergency scenarios (e.g. accidents, gas leak, UPI fraud, animal bites) or describe their situation in plain words into the AI Protocol Matcher.
2. **Selecting a Scenario**:
   Selecting an emergency opens a focused, distraction-free screen outlining immediate life-saving actions, critical things to avoid, and recovery steps.
3. **Triggering Live Assistance Discovery**:
   Clicking **Get Help Near Me** opens the spatial discovery tool. The user can either:
   - Click **Use My Location**: SafeIndia prompts the browser for one-time GPS coordinates.
   - Enter an Indian city name, area, or 6-digit postal PIN code in the search bar: SafeIndia queries Nominatim and returns matching Indian locations.
4. **Facility Querying & Failover**:
   The application builds an Overpass QL query searching for `amenity=police`, `amenity=hospital`, `amenity=clinic`, and `amenity=fire_station` within the selected radius (`5 km` by default, expandable to `10 km` or `20 km`). If the primary Overpass server times out, the service automatically fails over to backup mirrors.
5. **Rendering & Actions**:
   Facilities are displayed in a distance-sorted list alongside an interactive Leaflet map. Users can click **Call** (if an emergency phone number is listed in OSM data), **Get Directions** (opens Google Maps with destination coordinates), or **View on Map** to pan the map camera directly to that facility's pin.

---

## External Services & Data Sources

SafeIndia interacts with the following external services directly from the user's browser:

| Service | Endpoint | Usage |
|---|---|---|
| **OpenStreetMap Tiles** | `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png` | Visual base map layer rendered in Leaflet |
| **OSM Nominatim** | `https://nominatim.openstreetmap.org/search` | Geocoding Indian place names and PIN codes |
| **Overpass API** | `https://overpass-api.de/api/interpreter`<br>`https://lz4.overpass-api.de/api/interpreter`<br>`https://overpass.kumi.systems/api/interpreter` | Dynamic spatial query for nearby emergency facilities |
| **Official Emergency Portals** | `https://112.gov.in`<br>`https://cybercrime.gov.in`<br>`https://ceir.gov.in` | Direct links to verified Indian Government emergency platforms |

### Important Data Disclaimers
- **Public & Crowdsourced Data**: Map tiles, coordinates, and facility attributes are sourced from OpenStreetMap contributors. Facility names, operational hours, or telephone numbers may occasionally be incomplete or outdated.
- **Straight-Line Distance**: Distance values displayed in facility cards represent straight-line (Euclidean/Haversine) distance and do not account for road traffic, terrain, or driving routes.
- **Third-Party Availability**: Public Overpass API mirrors may experience temporary latency, rate-limiting, or downtime during high-traffic periods. SafeIndia implements multi-mirror failover and error banners with retry triggers.
- **Non-Governmental Independence**: SafeIndia is an independent, open-access public initiative. It does not represent or claim official government affiliation.

---

## Privacy & Safety Model

SafeIndia is built with a strict privacy-first architecture:

- **No User Accounts**: No registration, email addresses, passwords, or login tokens.
- **On-Demand Geolocation Only**: Device GPS coordinates are requested strictly after the user clicks the "Use My Location" button. The application never runs background tracking or continuous watch-position listeners.
- **Zero Coordinate Storage**: Location coordinates exist only in browser memory for the active session. They are never saved to `localStorage`, cookies, or remote databases.
- **No Third-Party Analytics**: SafeIndia includes no tracking pixels, ad networks, or user profiling scripts.
- **Explicit Call Confirmation**: Telephone numbers (`tel:112`, `tel:...`) use standard mobile URI schemes that require explicit confirmation on the user's handset before placing a call.

---

## Deployment

SafeIndia can be deployed to any modern static hosting platform (e.g. [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or [Cloudflare Pages](https://pages.cloudflare.com/)).

### Deploying to Vercel

1. Push your repository to GitHub.
2. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import the `Safe-India` repository.
4. Configure the build settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **Deploy**.

### Single-Page Application (SPA) Routing Note

If hosting on Apache or custom Nginx servers, configure rewrites so all routes serve `dist/index.html`. For Vercel, Vite's standard single-page configuration handles this automatically.

---

## Testing & Quality Verification

Before committing changes, run the repository's verification toolchain:

### 1. Static Analysis & Linting

```bash
npm run lint
```
*Runs `oxlint` across all source files. Ensures zero unused variables, clean imports, and consistent code quality.*

### 2. TypeScript Compilation & Production Build

```bash
npm run build
```
*Executes `tsc -b` to validate TypeScript contracts across all modules, followed by Vite production bundling.*

### 3. Manual Testing Checklist

When testing changes locally, verify the following workflows:
- [ ] **Navbar Navigation**: Switch between Home, Emergencies, Get Help Near Me, Awareness, Resources, and About.
- [ ] **Global Search**: Press `Ctrl+K` or `⌘K` to open the search modal. Type an emergency keyword and verify navigation to that protocol.
- [ ] **AI Protocol Matcher**: Type natural phrases (e.g. *"someone followed my car"*) and verify scenario matching.
- [ ] **112 Emergency Actions**: Verify the persistent top emergency bar and the Get Help Near Me emergency card trigger `tel:112`.
- [ ] **Geolocation Discovery**: Click "Use My Location", grant browser permission, and verify facility markers appear on the Leaflet map.
- [ ] **Manual Location Search**: Search an Indian city (e.g. *"Connaught Place, New Delhi"* or PIN *"110001"*) and select a suggestion from the dropdown.
- [ ] **Map Interactions**: Click markers to verify popup details; click "View on Map" from a card to test camera fly-to; click directions to verify Google Maps link.
- [ ] **Category Filters**: Toggle between All, Police, Hospitals, and Fire Stations; verify category count badges update accurately.
- [ ] **Radius Selector**: Change radius from 5 km to 10 km or 20 km to test re-querying.
- [ ] **Responsive Layout**: Test on mobile viewports (e.g. 375px width) to confirm smooth layout without overflow.

---

## Known Limitations

- **Internet Dependency**: Live facility discovery and map tiles require an active internet connection. (Static emergency protocols and checklists load into memory and remain readable if the tab stays open).
- **Crowdsourced Contact Information**: Emergency telephone numbers for specific local police outposts or clinics are dependent on OpenStreetMap tag completeness (`phone` or `contact:phone`).
- **Overpass Query Timeout**: In areas with very dense spatial data, public Overpass servers may take several seconds to return results during peak hours.
- **Straight-Line Distance**: Distance figures do not represent road driving distance or transit route time.

---

## Roadmap

Planned future enhancements (subject to community feedback):

- [ ] **Offline Protocol Caching (PWA)**: Service Worker integration to make all static emergency guides fully accessible without internet connectivity.
- [ ] **Road Network Routing**: Integration of open-source routing APIs (such as OSRM) for real turn-by-turn driving distances.
- [ ] **Offline Emergency PDF Exports**: Printable, pocket-sized emergency action cheat-sheets for homes, schools, and offices.
- [ ] **Additional Emergency Categories**: Specialized protocols for extreme weather, industrial chemical hazards, and railway emergencies.

---

## Contributing

Contributions to improve emergency guidance clarity, verify helpline records, or enhance map performance are welcome.

1. **Fork the repository** on GitHub.
2. **Create a descriptive feature branch**:
   ```bash
   git checkout -b feature/improved-guidance
   ```
3. **Make your changes** while adhering to existing formatting and architectural patterns.
4. **Run verification checks**:
   ```bash
   npm run lint
   npm run build
   ```
5. **Commit your changes**:
   ```bash
   git commit -m "docs: clarify Good Samaritan legal protections"
   ```
6. **Push to your branch and open a Pull Request**.

---

## License

No explicit license file is currently provided in this repository. All rights are reserved by the original project author.

If you are the repository owner, please consider adding an open-source license (such as the [MIT License](https://opensource.org/licenses/MIT) or [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)) to clarify reuse permissions for the public community.

---

## Acknowledgements

- **[OpenStreetMap Contributors](https://www.openstreetmap.org/)** for the global geographic database, base map tiles, and spatial amenity records.
- **[Overpass API](https://overpass-api.de/)** for the high-performance read-only spatial query API.
- **[Leaflet](https://leafletjs.com/)** for the lightweight open-source mobile-friendly interactive mapping library.
- **[Lucide](https://lucide.dev/)** for clean, consistent UI iconography.
- **[Vite](https://vitejs.dev/) & [React](https://react.dev/)** teams for the modern frontend development toolchain.
- **Government of India Emergency Initiatives** (112 ERSS, National Cyber Crime Portal, NDMA, MoRTH) for public emergency protocols and life-saving guidelines.
