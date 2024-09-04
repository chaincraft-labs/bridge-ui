# Allfeat Multi-Chain Token Swap DApp

A decentralized web application built with Next.js 14 and AppKit Connect Wallet, enabling seamless token swaps from the Allfeat blockchain to multiple other blockchains. Efficient, secure, and designed for cross-chain interoperability.

> MVP version

## Installation

```bash
git clone https://github.com/AlyraButerin/allfunding-bridge-ui.git && cd allfunding-bridge-ui
```

## Setup

### Environment files
Create 2 files

- .env.development
- .env.production

Check the sample.env.development as a template

### Constant file

Edit the `@constant/index.ts` file when you need to:

- add new Token pairs
- add ABI
- add smart contract addresses



## Run app in developement mode
```bash
npm run dev
```

## Build and run app in production mode
```bash
npm run build && npm run start
```
