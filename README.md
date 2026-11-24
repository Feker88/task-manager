# Task Manager — Angular 21

A full-stack task management web app built with Angular 21. Users can register, log in and manage their own to-do list: create, edit, complete and delete tasks through a REST API protected by JWT.

I built this during an Angular training course (Formation CPF) to practise the core skills of a modern Angular front end: standalone components, signals, reactive forms, routing and HTTP communication with an authenticated API.

![Home page](public/home.png)
FIY : /|\ 0 lines of code where written using IA tool /|\
---

## Features

- **Authentication**: sign up and log in. The JWT access token is stored on the client and sent with every task request.
- **Task CRUD**: list, create, edit and delete tasks.
- **Mark as done**: partial update (`PATCH`) of a task's status.
- **Form validation**: required fields, touched-state handling and error messages.
- **Live UI refresh**: child components emit events so the task list reloads after each change.

## Tech stack

| Layer      | Technologies |
|------------|--------------|
| Front end  | Angular 21, TypeScript 5.9, RxJS 7 |
| Styling    | Tailwind CSS 4 (via PostCSS) |
| Back end   | Node.js, `json-server` + `json-server-auth` (mock REST API with JWT) |
| Tooling    | Angular CLI, Vitest, Prettier, Git |

## Technical overview

### Architecture

```
src/app/
├── components/        # Reusable UI building blocks
│   ├── header/        
│   ├── footer/
│   └── task/          # Displays one task; @Input / @Output for parent communication
├── page/              # Routed views
│   ├── home/
│   ├── login/         
│   ├── register/
│   ├── tasks/         # Task list
│   ├── create-task/
│   └── edit-task/     # Reads :id from the route, pre-fills the form
├── services/
│   ├── api-identification.ts   # Login / register calls
│   └── api-task.ts             # Task CRUD calls (GET, POST, PATCH, DELETE)
├── api-config.ts      # API base URL and auth header
├── app.routes.ts      # Route table
└── app.config.ts      # App providers (router, HttpClient, zoneless)
```

### Angular concepts used

- **Standalone components**: no `NgModule`, each component declares its own imports.
- **Zoneless change detection** (`provideZonelessChangeDetection`) together with **signals** (`signal()`) for reactive state.
- **New control flow syntax** (`@for`, `@if`) in templates.
- **Reactive forms** (`FormGroup`, `FormControl`, `Validators`) for login, sign-up and the task forms.
- **Services with dependency injection** (`providedIn: 'root'`) that wrap `HttpClient`, which keeps the components free of HTTP logic.
- **RxJS Observables**: API calls are subscribed with `next` / `error` handlers.
- **Router**: route parameters (`task/:id`), `RouterLink` and programmatic navigation after login or save.
- **Component communication**: `@Input()` passes a task down, and `@Output()` with `EventEmitter` tells the parent list to refresh.

### Back end and security

The API is a lightweight Node.js server (`taskmanager-backend/`) based on `json-server-auth`:

- `POST /register` and `POST /login` return a JWT `accessToken`.
- `/tasks` routes are protected (rule `660`), so only an authenticated user can read or write tasks.
- Passwords are stored hashed with bcrypt.

## Getting started

**Prerequisites:** Node.js 20+ and npm.

```bash
# 1. Clone
git clone https://github.com/Feker88/task-manager.git
cd task-manager

# 2. Start the API (http://localhost:3000)
cd taskmanager-backend
npm install
npm start

# 3. In a second terminal, start the Angular app (http://localhost:4200)
cd ..
npm install
npm start
```

Create an account on the **Register** page, then log in to manage your tasks.

## Next steps

These are the improvements I plan to make next:

- An **HTTP interceptor** that adds the JWT header to each request (today the header is set in a shared config).
- A **route guard** to block the task pages for unauthenticated users.
- **Environment files** for the API URL (dev / prod).
- More **unit tests** (Vitest) for the services and components.
- Responsive UI polish with Tailwind and loading / empty states.

## Author

**Feker Ben Amamou**: Angular / front-end developer
GitHub: [@Feker88](https://github.com/Feker88)
