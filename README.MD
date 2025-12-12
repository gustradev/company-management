# Company Management System

ClickUp-like Project & Company Monitoring  
**Full Vanilla JavaScript · Modular SPA · Self-Hosted**

---

## Overview

This project is a **Company, Department, Project, and Task Management System** inspired by ClickUp, built using a **full vanilla JavaScript stack** (frontend & backend).

The system is designed to be:
- Modular
- Flexible
- Self-hosted
- Friendly for long-term development
- Easy to extend by humans and AI

Project root directory:  
D:/company-management

---

## Key Principles

- No frontend frameworks (no React, Vue, Angular)
- Modular Single Page Application (SPA)
- Entities are fully movable (no hard coupling)
- Cross-project & cross-department task relations
- Clean architecture for scalability
- Clear structure for AI-assisted development

---

## Technology Stack

### Frontend
- HTML5
- Vanilla JavaScript (ES Modules)
- Tailwind CSS  
  - Development: Tailwind CDN  
  - Production: Tailwind CLI (CSS extraction & purge)
- Custom SPA Router
- Dynamic Module Loader

### Backend
- Node.js
- Express (or Fastify)
- JWT Authentication
- REST API (JSON)
- Multer (file uploads)

### Database
- PostgreSQL (recommended)
- MySQL / MariaDB (supported)
- Prisma ORM (recommended)
- phpMyAdmin supported if needed

### Deployment
- Frontend: Static files
- Backend: Node.js service
- Public access via Cloudflare Tunnel
- Full root access on server

---

## Core Data Hierarchy

User  
└── Company  
  └── Department  
    └── Project  
      └── Task Group  
        └── Task  

Notes:
- Every entity can be reassigned to another parent
- Tasks may have relations across projects and departments
- No rigid hierarchy constraints

---

## Project Structure

company-management/  
├── frontend/  
│   ├── index.html  
│   ├── app.js  
│   ├── module-loader.js  
│   ├── router.js  
│   ├── modules/  
│   │   ├── auth/  
│   │   ├── dashboard/  
│   │   ├── company/  
│   │   ├── department/  
│   │   ├── project/  
│   │   ├── task/  
│   │   └── gantt/  
│   ├── services/  
│   └── assets/  
│       ├── css/  
│       └── icons/  
│  
├── backend/  
│   ├── src/  
│   │   ├── modules/  
│   │   │   ├── auth/  
│   │   │   ├── company/  
│   │   │   ├── department/  
│   │   │   ├── project/  
│   │   │   ├── task/  
│   │   │   └── relation/  
│   │   ├── middleware/  
│   │   └── utils/  
│   └── prisma/  
│  
└── README.md  

---

## Frontend Architecture

- Single Page Application (SPA)
- No page reloads
- Modules loaded dynamically based on route
- Each module contains:
  - View (HTML)
  - Logic (JavaScript)
  - Tailwind-based styling

---

## Routing Convention

Examples:
- #/login
- #/register
- #/dashboard
- #/company/:id
- #/department/:id
- #/project/:id
- #/task/:id
- #/gantt

Routing is intentionally manual for clarity and control.

---

## Authentication & Security

- JWT-based authentication
- API protected by middleware
- Token managed in frontend state
- CORS restricted to Cloudflare domains
- Backend API is not publicly exposed

---

## Monitoring & Visualization (Planned)

- Dashboard overview
- Progress aggregation
- Gantt chart
- Bi-weekly calendar
- Activity timeline

---

## Development Notes

- Local development on Windows (Drive D)
- Frontend can be served via XAMPP or static server
- Backend runs as Node.js service
- Tailwind CDN for development
- Tailwind CLI for production build
- Production hosted on Linux server via Cloudflare Tunnel

---

## Contribution Rules (Important)

- Do not introduce frontend frameworks
- Keep all features modular
- Maintain movable entity design
- Always consider cross-entity relations
- Follow existing folder and naming conventions

This README is the **single source of truth** for development.

---

## Roadmap

Phase 1:
- Authentication
- Company / Department / Project CRUD
- SPA base & module loader

Phase 2:
- Task management
- Cross-task relations
- Drag & move features

Phase 3:
- Gantt & calendar views
- File attachments

Phase 4:
- Roles & permissions
- Notifications
- Activity logs

---

## Final Note

This project is designed for long-term usage, self-hosted deployment,
and scalable growth with AI-assisted development.

All future development must align with this document.
