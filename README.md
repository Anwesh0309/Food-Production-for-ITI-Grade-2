# Food Production SkillLab — ITI Grade-2 Trade 👨‍🍳🍳

A comprehensive, bilingual (**English & Hindi**) digital learning and interactive simulation platform built for the **Food Production (General)** trade curriculum.

Designed for ITI trainees, vocational instructors, and culinary students to build foundational culinary skills, food safety standards, kitchen brigade discipline, and commercial food production expertise through interactive visual simulations and rigorous assessments.

---

## 🌟 Key Features

### 1. 14 Comprehensive Trade Modules (Year 1 & Year 2)
Structured around the 7-stage experiential learning methodology (**Watch $\to$ Read $\to$ Practice $\to$ Simulate $\to$ Quiz $\to$ Apply $\to$ Review**):
- **Module 1**: Introduction to Food Production & the Commercial Kitchen
- **Module 2**: Kitchen Organization, Brigade & Escoffier Hierarchy
- **Module 3**: Chef’s Uniform & Protective Clothing (PPE)
- **Module 4**: Personal Hygiene, Hand-Washing & Grooming
- **Module 5**: Commercial Kitchen Equipment & Heavy Appliances
- **Module 6**: Kitchen Knives, Cutting Boards & Classical Vegetable Cuts
- **Module 7**: Culinary Commodities & Food Group Classification
- **Module 8**: Cold Storage, Chilling & Temperature Safety Zones
- **Module 9**: Classical Cooking Methods (Moist, Dry & Medium of Fat)
- **Module 10**: Bakery & Baking Fundamentals
- **Module 11**: Yeast Dough & Batter Preparation
- **Module 12**: Kitchen Safety, Fire Extinguishers & Emergency First-Aid
- **Module 13**: Food Safety, HACCP & Cross-Contamination Prevention
- **Module 14**: Food Presentation, Plating Principles & The Clock Method

### 2. 13 Interactive Virtual Kitchen Labs
- **Virtual Kitchen Layout (`/labs/virtualKitchen`)**: Plan commercial kitchen sections (Receiving, Store, Prep, Hot Kitchen, Bakery, Wash-up) with unidirectional workflow.
- **Food Safety Inspector (`/labs/foodSafety`)**: Identify hygiene hazards, raw food drippage, and sanitation issues in real-time.
- **Temperature & Storage (`/labs/foodStorage`)**: Organize refrigerators safely into freezer, chiller, and danger zones.
- **Chef Uniform Studio (`/labs/uniform`)**: Interactive SVG chef avatar to dress in standard uniform pieces.
- **Vegetable Cuts Simulator (`/labs/vegCuts`)**: Identify Julienne, Brunoise, Macédoine, Batonnet, and Chiffonade cuts.
- **Kitchen Hygiene Simulator (`/labs/kitchenHygiene`)**: Master the WHO/FSSAI 7-step handwashing procedure.
- **Kitchen Safety & First-Aid (`/labs/kitchenSafety`)**: Respond to oil fires, cuts, burns, and electrical hazards.
- **Equipment Identification (`/labs/equipment`)**: Master knives, mandolines, chinois, and chef tools.
- **Commodity Sorter (`/labs/commodities`)**: Sort raw ingredients by botanical and animal origin.
- **Bakery Oven Heat Lab (`/labs/bakery`)**: Bake sponge cakes, cookies, breads, and puff pastries at exact temperatures.
- **Dough Proving Lab (`/labs/dough`)**: Order yeast dough steps and monitor proving times and volume rise.
- **Cooking Methods Simulator (`/labs/cookingMethods`)**: Select suitable methods for tender cuts, tough meats, fish, and vegetables.
- **Food Plating Studio (`/labs/plating`)**: Balance dishes using the classical clock method.

### 3. Trade Knowledge Assessment Bank (50 Questions)
- 50 bilingual questions covering all trade theory syllabus domains.
- Difficulty filtering (`All`, `Easy`, `Medium`, `Hard`).
- Real-time explanations, numeric recipe math calculation checks, and sound cues.

### 4. Career Progression & Gamification
- **Kitchen Brigade Ladder**: Trainee $\to$ Commis Chef $\to$ Chef de Partie $\to$ Sous Chef $\to$ Head Chef $\to$ Executive Chef.
- **Trade Badges**: Unlock 10 culinary achievement badges.
- **Missions**: Daily, weekly, and challenge objectives to reinforce learning.

### 5. UI/UX & Audio Engineering
- **Bilingual Switcher**: 1-click toggle between English and Hindi (`हिन्दी`).
- **Web Audio API Tactile Click Engine**: Low-latency mechanical click and chime audio feedback on interactions with mute controls.
- **Dark & Light Mode**: Accessible high-contrast culinary palette.
- **Fully Responsive**: Optimized for Desktop (1920px), Laptop (1280px), Tablet (768px), and Mobile (360px–390px).

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) with localStorage persistence
- **Icons**: [Lucide React](https://lucide.dev/)
- **Localization**: [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/)
- **Audio**: Web Audio API (Synthesized low-latency cues)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Anwesh0309/Food-Production-for-ITI-Grade-2.git
cd Food-Production-for-ITI-Grade-2

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
# Typecheck and build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License & Credits
Developed for Vocational & Industrial Training Institutes (ITI) under the Craftsmen Training Scheme (CTS) for the Food Production (General) trade.
