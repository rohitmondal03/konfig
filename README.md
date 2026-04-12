# Konfig

> Configuration management for modern applications.

[![npm version](https://img.shields.io/npm/v/@konfig/sdk.svg?style=flat-square)](https://www.npmjs.com/package/@konfig/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/github/actions/workflow/status/rohitmondal03/konfig/ci.yml?branch=main&style=flat-square)](https://github.com/rohitmondal03/konfig/actions)

## Quick Start

```typescript
import { Konfig } from "@konfig/sdk"

const konfig = new Konfig({
  apiKey: process.env.KONFIG_API_KEY
})

await konfig.preload()

const db = await konfig.get("DATABASE_URL")
```

## Installation

```bash
# npm
npm install @konfig/sdk

# pnpm
pnpm add @konfig/sdk

# yarn
yarn add @konfig/sdk
```

## Usage

1. Create project in dashboard
2. Generate API key
3. Add configs
4. Fetch using SDK

```typescript
import { Konfig } from "@konfig/sdk"

// Initialize the client
const konfig = new Konfig({ 
  apiKey: process.env.KONFIG_API_KEY 
})

async function main() {
  // Preload caches all configuration for fast access
  await konfig.preload()
  
  // Retrieve your securely stored variables
  const dbUrl = await konfig.get("DATABASE_URL")
  const port = await konfig.get("PORT")

  console.log(`Starting app on port ${port}...`)
}

main()
```

## How It Works

Application ➔ SDK ➔ API ➔ Config Store

## Features

- Secure config storage
- SDK-based access
- Project-based API keys
- Fast API
- Caching and preload support
- Background refresh

## Documentation

**[Read the Docs ➔](https://konfig-docs.vercel.app)**

---

*Built for developers who care about simplicity and performance.*
