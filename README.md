# Frontend Challenge

This is a Vanilla TypeScript app built with Vite to visualize and manage documents using a mock WebSocket backend.

### 💡 Decisions

- Vanilla JS/TS was used as instructed to demonstrate raw DOM manipulation.
- `<template>` tags keep HTML and JS loosely coupled.
- State is kept in memory and can be easily refactored into a global store module.
- Bootstrap CDN and svg icons to speed up layout.
- Vite to compile and serve the project.
- Vitest to run unit testing.
- Implemented as a **monorepo**, meaning both the frontend and backend are developed within a single repository to simplifies local development.

## 🚀 Features

- View documents with metadata, contributors and attachments
- Create new documents with dynamic form
- Toggle between list and grid view
- Sort by title, version or creation date
- Live notification counter using WebSockets

## 🧱 Tech Stack

- Vite + TypeScript
- HTML5 templates
- Vanilla JS and SASS
- WebSocket API
- Modular architecture

## 📦 Setup

### Install dependencies

```
yarn install
```

### Create Local Environment File

1. Copy `.env.sample` to `.env.development`
2. Ensure `.env.development` contains all necessary environment variables for local development.

### Run frontend

```
yarn dev:client
```

### Run WebSocket server (Go)

```
yarn dev:server
or
cd ../server
go run server.go
```

### Run in paralell frontend and server

```
yarn dev
```

### Run tests

```
yarn test:unit
```
