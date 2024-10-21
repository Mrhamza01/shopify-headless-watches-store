# Shopify Headless Watches Store

This repository contains a **Shopify Headless Store** built for showcasing watches. It is designed with cutting-edge web technologies to deliver a fast, scalable, and customizable e-commerce experience using the **Shopify Storefront GraphQL API**.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Tech Stack

The project leverages the following technologies and frameworks:

- **[Next.js](https://nextjs.org/)**: Framework for server-side rendering and static site generation, improving SEO and performance.
- **[TypeScript](https://www.typescriptlang.org/)**: Provides static typing to ensure code quality and reduce runtime errors.
- **[React](https://reactjs.org/)**: JavaScript library for building interactive and dynamic user interfaces.
- **[ShadCN](https://shadcn.dev/)**: For easily building UI components with React and CSS-in-JS.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework that enables rapid UI development.
- **[Zustand](https://zustand-demo.pmnd.rs/)**: Lightweight state management library for managing global application state.
- **[Apollo Client](https://www.apollographql.com/docs/react/)**: GraphQL client used to efficiently manage data fetching and state.
- **[Shopify Storefront GraphQL API](https://shopify.dev/docs/storefront-api)**: Used to fetch product data, collections, inventory, and other e-commerce operations directly from Shopify.

## Features

- **Headless Architecture**: Full control over the frontend design and functionality without being restricted by Shopify's default theme structure.
- **Dynamic Product Display**: Retrieves real-time data from the Shopify Storefront GraphQL API, displaying watches and collections dynamically.
- **SSR and SSG**: Leverages Next.js for server-side rendering (SSR) and static site generation (SSG) to improve performance and SEO.
- **Responsive UI**: Styled using Tailwind CSS and ShadCN for a seamless and mobile-friendly user experience.
- **State Management**: Manages global application state efficiently using Zustand.
- **Optimized Performance**: Built with performance in mind to ensure fast page load times and minimal bundle size.

## Setup and Installation

Follow these steps to set up the project on your local machine:

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 14.x or later).
- **Shopify Store**: A Shopify store with API access enabled (create a private app for API keys).
- **Git**: Version control to clone this repository.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/shopify-headless-watches-store.git
   cd shopify-headless-watches-store
