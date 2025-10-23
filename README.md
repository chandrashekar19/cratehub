> 
# Crate 👕👖📦

#### Get monthly subscription of trendy clothes and accessories.
- **API** built with Node, GraphQL, Express, Sequelize (MySQL) and JWT Auth
- **WebApp** built with React and Redux along with Server Side Rendering (SSR) / SEO friendly
- Written in ES6+ using Babel + Webpack



## Features
- Modular and easily scalable code structure
- Emphasis on developer experience
- UI components in separate folder which can be swapped for your favorite UI framework easily
- GraphQL schema with associations
- Database migration and data seeding
- User authentication using JSON Web Tokens with GraphQL API
- File upload feature with GraphQL
- React storybook demonstrating UI components for web
- Server side rendering
- Multi-package setup and dev scripts for an automated dev experiance


## Useful for
- Developers with basic knowledge on React exploring advance React projects
- Exploring GraphQL
- Scalable project structure and code
- Multi-package scripts
- Sample project with combination of all above

## Screenshots and GIFs
Click on image to view fullscreen and zoom

### Desktop
[IMAGE](https://github.com/atulmy/atulmy.github.io/blob/master/images/crate/desktop-all-with-link.png)

![Crate Desktop](https://raw.githubusercontent.com/atulmy/atulmy.github.io/master/images/crate/desktop-all-with-link.png)


## Setup and Running
- Prerequisites
  - Node
  - MySQL (or Postgres / Sqlite / MSSQL)
- Clone repo `git clone git@github.com:atulmy/crate.git crate`
- Switch to `code` directory `cd code`
- Configurations
  - Modify `/api/src/config/database.json` for database credentials
  - Modify `/api/.env` for PORT (optional)
  - Modify `/web/.env` for PORT / API URL (optional)
  - Modify `/mobile/src/setup/config.json` for API URL (tip: use `ifconfig` to get your local IP address)
- Setup
  - backend: Install packages and database setup (migrations and seed) `cd backend` and `npm run setup`
  - frontend: Install packages `cd web` and `npm install`
 

 # 🚀 Crate – Development Setup Guide

This project contains both the **backend API** (Node.js + Express + GraphQL + Sequelize) and the **frontend web app** (React + Redux).

---

## 🛠️ Manual Development Setup

### 1. Run Backend
```bash
cd backend
npm start


2. Run Frontend

Copy code
cd frontend
npm run dev
Then open the web app at 👉 http://localhost:3000/

⚡ Multi-Package Automation
Once Node.js, Docker (for MySQL), and your configuration are set up correctly, you can manage both packages easily.
