# TalentFlow — Employee Management (Spring Boot + Tailwind)

TalentFlow is a polished full‑stack Employee Management application built to showcase practical end-to-end skills for backend, frontend, and full‑stack roles. It pairs a Spring Boot REST API and MySQL persistence with a responsive, mobile-first frontend using Tailwind CSS and vanilla JavaScript. The UI includes polished animations, accessible modals, toast notifications, and a complete CRUD workflow for managing employee records.

**One-line:** TalentFlow — Full-stack Employee Management (Spring Boot + Tailwind) with responsive UI, animated UX, and complete CRUD.

---

**Key Highlights**
- **Full REST API:** GET/POST/PUT/DELETE employee endpoints implemented with Spring Boot and JPA/Hibernate.
- **Clean architecture:** Layered code with `EmployeeEntity`, `EmployeeRepository`, `EmployeeService`, `EmployeeServiceImpl`, and `EmpController`.
- **Responsive, production-minded UI:** Tailwind CSS-based, mobile-first layout, accessible modals, and responsive table behavior.
- **Polished UX:** Animated gradient header, toast notifications, loading overlays, and confirmation dialogs.
- **Persistence:** MySQL integration with straightforward configuration in `src/main/resources/application.properties`.
- **Developer-friendly:** Minimal setup and clear starter commands included below.

---

**Tech Stack**
- Backend: Java 17, Spring Boot, Spring Data JPA
- Database: MySQL
- Frontend: Tailwind CSS, Font Awesome, Vanilla JavaScript (ES6+)
- Build: Maven (wrapper included)

---

**Quick Start (Local)**
1. Clone the repo:

   ```bash
   git clone <repo-url>
   cd "crud"
   ```

2. Configure MySQL connection in `src/main/resources/application.properties` (database, username, password).

3. Run the application

   - Windows (PowerShell):
     ```powershell
     mvnw.cmd spring-boot:run
     ```

   - Unix / macOS:
     ```bash
     ./mvnw spring-boot:run
     ```

4. Open the app in your browser:

   - `http://localhost:8080`

5. Use the UI to create, edit, search, and delete employee records.

---

**What recruiters should look for**
- **Backend:** Inspect `EmpController.java` for REST endpoints and request handling; `EmployeeServiceImpl.java` for service-layer design and transaction boundaries.
- **Data modeling:** Check `EmployeeEntity.java` and repository usages for JPA mapping and repository patterns.
- **Frontend:** Open `src/main/resources/static/index.html` and `app.js` to review responsive UI patterns, client-side validation, state handling, and graceful UX (loading states, toasts, modals).
- **UX & Accessibility:** Notice keyboard-focusable controls, responsive breakpoints, and text truncation/aria-friendly patterns in the table/modal layouts.

---

**Notes & Next Steps**
- The project is intentionally self-contained and ready for small deployment or demos.
- If you want, I can add a Dockerfile, CI workflow (GitHub Actions), or a sample dataset to speed review by recruiters.

---

**Author**
- Project by thepranay01 — contact via GitHub profile.
