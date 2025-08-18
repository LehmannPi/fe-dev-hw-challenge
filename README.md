# CRM Leads & Opportunities App

This project is a simple CRM-style web application built with **React**, **TypeScript**, and **Vite**. It demonstrates modern UI patterns, state management, and local persistence for a leads and opportunities workflow.

## Features

- **Leads Table:** View, filter, search, and sort a list of leads loaded from a local JSON file.
- **Lead Detail Drawer:** Click a lead to view and edit details in a side drawer.
- **Status Filter:** Filter leads by status using a custom select component.
- **Search:** Search leads by name or company.
- **Sort:** Toggle sorting by lead score.
- **Edit & Save:** Edit lead details and persist changes in session state.
- **Convert to Opportunity:** Convert a lead to an opportunity, which is then shown in a separate table.
- **Opportunities Table:** View all converted opportunities with details like stage and account name.
- **Theme Toggle:** Switch between light and dark mode, with your preference saved.
- **Filter Persistence:** Search, filter, and sort settings are saved in localStorage and restored on reload.

## Data

The sample leads data (`public/leads.json`) was generated using [Mockaroo](https://mockaroo.com/), a tool for creating realistic mock data.

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Radix UI & Shadcn UI components

## Getting Started

1. Install dependencies:

```sh
bun install
# or
npm install
```

2. Start the development server:

```sh
bun run dev
# or
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Customization

- You can modify the leads data in `public/leads.json` or generate new data with Mockaroo.
- UI components are located in `src/components/ui` and can be customized for your brand.

## Linting & Type Safety

This project uses ESLint and strict TypeScript settings. See the comments in `eslint.config.js` for recommended configurations and plugins for production use.
