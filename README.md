# 🛒 Bazar Dor (বাজার দর)

**Your Daily Market Prices, Made Simple.**

## 📌 Description

Bazar Dor is a web application that helps people in Bangladesh explore the prices of everyday market products in one place. Users can browse products, compare prices, track price changes, and access market information through a simple, responsive Bengali interface.

## ✨ Features

- **Daily Market Prices:** View available prices of essential market products.
- **Product Categories:** Browse rice, lentils, oil, vegetables, fish, meat, eggs, milk, and spices.
- **Price Change Indicators:** Identify price increases, decreases, and unchanged prices.
- **Product Details:** View individual product information and pricing.
- **Search and Sorting:** Find products and sort them by price.
- **User Authentication:** Register and sign in using email and password.
- **Social Authentication:** Google and GitHub sign-in through Better Auth.
- **Responsive Design:** Works across desktop, tablet, and mobile devices.
- **Bengali Interface:** Provides Bengali text for a familiar local experience.
- **Price Ticker:** Displays product prices and price changes in a scrolling ticker.
- **Toast Notifications:** Shows feedback for user actions and authentication events.

## 🛠️ Technologies Used

- **Next.js 16** — React framework and App Router
- **React** — UI development
- **TypeScript** — Type safety
- **Tailwind CSS** — Responsive styling
- **Better Auth** — Authentication
- **Prisma ORM** — Database access
- **Neon PostgreSQL** — Cloud database
- **Lucide React** — Icons
- **React Hot Toast** — Notifications
- **Programming Hero API** — Product and market price data
- **Vercel** — Deployment and hosting

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Yeshrat-Zerin-Yera/bazar-dor.git
```

### 2. Enter the project directory

```bash
cd bazar-dor
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root and add the environment variables required by your application.

For example:

```env
DATABASE_URL="your-neon-database-url"
BETTER_AUTH_SECRET="your-auth-secret"
BETTER_AUTH_URL="http://localhost:3000"

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

Use your actual credentials and any additional variables required by your project. Never commit secrets to GitHub.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for production

```bash
npm run build
```

## 🌐 Live Demo

**Live Website:** https://bazar-dor-xbp8.vercel.app

## 📂 Repository

[View Bazar Dor on GitHub](https://github.com/Yeshrat-Zerin-Yera/bazar-dor)

## 🔐 Security

- Store credentials and secrets in environment variables.
- Never expose database URLs or authentication secrets in client-side code.
- Configure OAuth callback URLs for the correct deployment domain.

## 📄 License

This project is currently provided for educational and personal portfolio purposes. Add a formal open-source license if you intend to distribute it under specific reuse terms.

---

**Bazar Dor — বাজারদর জানুন, সচেতনভাবে বাজার করুন।**