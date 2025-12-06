// Swap this implementation for a real API call without touching the login UI.

export async function authenticate({ username, password }) {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Demo credentials – replace with real auth logic later.
  const DEMO_USERNAME = "demo@bubblynet.com";
  const DEMO_PASSWORD = "Demo123!";

  if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
    return {
      ok: true,
      user: {
        username: DEMO_USERNAME,
        displayName: "Demo User",
      },
    };
  }

  return {
    ok: false,
    message: "Invalid username or password.",
  };
}
