ClickUp-Like Company & Project Management System
Full Vanilla JavaScript • Modular SPA • Self-Hosted

======================================================================
1. PROJECT OVERVIEW
======================================================================

Project ini adalah sistem Company & Project Monitoring dengan konsep
mirip ClickUp, namun dibangun dengan pendekatan:

- Full Vanilla JavaScript (Frontend & Backend)
- Modular Single Page Application (SPA)
- Tanpa framework frontend (React/Vue/Angular)
- Self-hosted (server laptop sendiri)
- Flexible hierarchy & cross-relation antar task
- AI-assisted development friendly

Project root directory:
D:/company-management


======================================================================
2. GOALS & USE CASE
======================================================================

Tujuan utama sistem:

- Monitoring multi-company dalam satu akun user
- Manajemen Department, Project, Task secara fleksibel
- Relasi lintas struktur (task antar project / department)
- Visualisasi progress (Dashboard, Gantt, Calendar)
- Struktur data yang bisa dipindah-pindah tanpa refactor besar

Use case utama:
- Internal company monitoring
- Client project tracking
- Long-term scalable project management system


======================================================================
3. TECHNOLOGY STACK
======================================================================

FRONTEND
- HTML5
- Vanilla JavaScript (ES Modules)
- Tailwind CSS
  - Development: Tailwind CDN
  - Production: Tailwind CLI (extract & purge CSS)
- Manual SPA Router + Module Loader

BACKEND
- Node.js
- Express (default) atau Fastify
- JWT Authentication
- Multer (file upload)
- REST API (JSON)

DATABASE
- Primary recommended: PostgreSQL
- Alternative: MySQL / MariaDB
- phpMyAdmin boleh digunakan
- ORM recommended: Prisma

DEPLOYMENT
- Frontend: Static files
- Backend: Node.js service
- Public access: Cloudflare Tunnel
- Full root access (install bebas)


======================================================================
4. CORE DATA HIERARCHY
======================================================================

User
 └── Company
      └── Department
           └── Project
                └── Task Group
                     └── Task

IMPORTANT:
- Setiap entity bisa dipindahkan ke parent lain
- Task bisa memiliki relasi lintas struktur
- Tidak ada hard coupling antar entity


======================================================================
5. PROJECT STRUCTURE
======================================================================

D:/company-management
|
|-- frontend/
|   |-- index.html              (SPA entry point)
|   |-- app.js                  (bootstrap application)
|   |-- module-loader.js        (dynamic module loader)
|   |-- router.js               (SPA routing)
|   |
|   |-- modules/
|   |   |-- auth/
|   |   |-- dashboard/
|   |   |-- company/
|   |   |-- department/
|   |   |-- project/
|   |   |-- task/
|   |   |-- gantt/
|   |
|   |-- services/
|   |   |-- api.js
|   |   |-- auth.service.js
|   |   |-- state.js
|   |
|   |-- assets/
|       |-- css/
|       |-- icons/
|
|-- backend/
|   |-- src/
|   |   |-- server.js
|   |   |-- app.js
|   |   |-- routes.js
|   |   |
|   |   |-- modules/
|   |   |   |-- auth/
|   |   |   |-- company/
|   |   |   |-- department/
|   |   |   |-- project/
|   |   |   |-- task/
|   |   |   |-- relation/
|   |   |
|   |   |-- middleware/
|   |   |-- utils/
|   |
|   |-- prisma/
|   |   |-- schema.prisma
|   |
|   |-- package.json
|
|-- README.txt  (rename to README.md for GitHub)


======================================================================
6. FRONTEND ARCHITECTURE
======================================================================

SPA Flow:

index.html
 → app.js
   → module-loader.js
     → load module based on route & auth state

Characteristics:
- No page reload
- Dynamic import per module
- Each module has:
  - View (HTML)
  - Logic (JS)
  - Optional scoped styles (Tailwind)


======================================================================
7. ROUTING CONVENTION
======================================================================

Example routes:

#/login
#/register
#/dashboard
#/company/:id
#/department/:id
#/project/:id
#/task/:id
#/gantt

Routing dibuat manual agar:
- Mudah dikontrol
- Mudah dikembangkan AI
- Tidak tergantung library eksternal


======================================================================
8. DATABASE CORE ENTITIES
======================================================================

Main tables:
- users
- companies
- departments
- projects
- task_groups
- tasks
- task_relations

task_relations digunakan untuk:
- Cross-project task relation
- Dependency
- Reference
- Custom workflow


======================================================================
9. AUTH & SECURITY
======================================================================

- JWT based authentication
- Token dikontrol di frontend
- API protected via middleware
- CORS dibatasi domain Cloudflare
- Backend API tidak public langsung


======================================================================
10. MONITORING & VISUALIZATION
======================================================================

Planned modules:
- Dashboard overview
- Progress roll-up
- Gantt chart
- Bi-weekly calendar
- Activity timeline


======================================================================
11. DEVELOPMENT NOTES
======================================================================

- Development dilakukan di Windows (D:/)
- Backend bisa dijalankan lokal
- Frontend bisa di-serve via XAMPP / static server
- Tailwind CDN untuk dev, Tailwind CLI untuk production
- Server production Linux via Cloudflare Tunnel


======================================================================
12. RULES FOR AI & DEVELOPERS
======================================================================

IMPORTANT RULES:

- Jangan menambahkan framework frontend
- Jangan mengubah struktur tanpa alasan kuat
- Semua fitur harus modular
- Semua entity harus movable
- Relasi lintas struktur harus selalu dipertimbangkan

README ini adalah single source of truth.


======================================================================
13. ROADMAP
======================================================================

Phase 1:
- Auth
- Company / Department / Project CRUD
- SPA module loader

Phase 2:
- Task management
- Cross-task relations
- Drag & move

Phase 3:
- Gantt & calendar
- File attachments

Phase 4:
- Roles
- Notification
- Activity log


======================================================================
14. FINAL NOTE
======================================================================

Project ini dirancang untuk jangka panjang,
self-hosted, scalable, dan AI-assisted development.

Semua pengembangan wajib mengacu pada dokumen ini.
