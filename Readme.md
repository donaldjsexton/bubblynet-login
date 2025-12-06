BubblyNet Login
This application implements a portable login flow using React, bundled into a static asset set, and served through Docker/nginx. The emphasis is not on visual flare but on clarity, reuse, and correctness.
Purpose and Reasoning
The goal was to build a login experience that could be lifted into future products without redesigning authentication each time. The guiding decisions were:
One reusable login, not multiple variants
A clear authentication boundary
Minimal dependencies and low configuration surface
Brand-aligned styling without binding logic to design
The result is intentionally simple and stable.
Design Approach
Functional
Validate required fields.
Provide clear feedback for authentication failures.
Disable submission during processing.
Move to a confirmation view on success.
Structural
The UI collects credentials.
authService is the single interface to real authentication.
App.js switches between logged-in and logged-out states.
Changing how authentication works does not require updating UI code.
Technology Choices
Why React (plain JavaScript):
Matches the stated stack requirement.
Easy to transport into other React applications.
JSX inside .js files avoids unnecessary file differentiation.
Why static build + nginx:
Mirrors how SPAs are commonly deployed.
Keeps runtime small and predictable.
Removes Node from production image.
Why no extra libraries:
Keeps scope honest.
Eliminates unnecessary dependencies.
Makes the code easy to hand off.
Docker Packaging
The image is built using a two-stage process:
Build bundle with Node.
Serve assets through nginx.
This approach creates a lean production image and demonstrates that the login can run anywhere Docker is available.
Integration Surface
The only project-specific seam is:
src/auth/authService.js
Swap its implementation to connect to:
API endpoint
OAuth
Internal auth system
No UI or structural changes are required.
Running
npm install
npm run build
docker build -t bubblynet-login .
docker run -d -p 8080:80 bubblynet-login
Navigate to:
http://localhost:8080
Summary
This login is:
Self-contained
Easy to integrate
Predictable in behavior
Flexible for future extensions
Aligned visually with BubblyNet without entangling business logic
It is built with the expectation that this exact component can be reused rather than rewritten.
