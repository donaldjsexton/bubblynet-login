# BubblyNet Login

This project delivers a focused, reusable login experience using React. The objective was not to create a feature-rich product, but to build a clear, portable authentication entry point that can be integrated into future BubblyNet applications without modification.

---

## Objectives

The implementation is designed to:

- Represent a single login flow that can be reused across applications  
- Keep logic and styling separated  
- Provide a predictable authentication boundary  
- Demonstrate clean decisions rather than excessive features  

The result is intentionally simple and easy to hand off.

---

## Design Summary

### Structure
The application has three clear responsibilities:

| File/Layer | Responsibility |
|------------|----------------|
| `LoginPage` | Collect user credentials and display validation |
| `authService.js` | Perform authentication (currently mocked) |
| `App.js` | Render authenticated vs. unauthenticated states |

This separation allows authentication to change without UI refactoring.

---

## Technology Decisions

**React with standard build tooling**  
- Familiar to most teams  
- Minimal configuration  
- No extra libraries required  

**Static build served via nginx inside Docker**
- Matches real deployment practices  
- Removes Node from production runtime  
- Produces a deterministic output  

**No routing or external libraries**
- Scope is intentionally limited to login behavior  
- Reduces onboarding time for reviewers  
- Keeps handoff clean

---

## Authentication Boundary

Authentication logic is centralized in:

```
src/auth/authService.js
```

Only this file changes when integrating with:

- REST API  
- OAuth provider  
- Internal authentication service  

UI behavior remains the same.

---

## User Experience Principles

The login interaction follows a few deliberate rules:

- Validate only when submitting  
- Show system-level errors above the form  
- Disable submit while authenticating  
- Transition cleanly into a confirmation state  

The UX remains predictable, quiet, and friction-free.

---

## Running the Project

```bash
npm install
npm run build
docker build -t bubblynet-login .
docker run -d -p 8080:80 bubblynet-login
```

Then visit:

```
http://localhost:8080
```

---

## Integration Notes

This login can be reused by:

1. Moving `LoginPage`, `App.js`, and CSS into another React project  
2. Replacing only the implementation inside `authService.js`  
3. Wiring success state to real routes or dashboards  

No other structural changes are required.

---

## Summary

This login is:

- Fully self-contained  
- Modular and replaceable  
- Minimal without being incomplete  
- Aligned with brand direction  
- Built with future reuse in mind  

The code emphasizes clarity and reusability rather than decoration or feature density.
