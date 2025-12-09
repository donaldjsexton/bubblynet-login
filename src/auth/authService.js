// Thin auth boundary: swaps cleanly for a real API call without touching the UI.

let cachedUsers = null;
const DEMO_FALLBACK = [
  {
    username: "demo@bubblynet.com",
    password: "Demo123!",
    displayName: "Demo User",
  },
];

async function fetchUsersFromApi() {
  if (cachedUsers) {
    return cachedUsers;
  }

  const response = await fetch("/api/users.json");

  if (!response.ok) {
    throw new Error("Unable to reach auth datasource");
  }

  const data = await response.json();
  cachedUsers = Array.isArray(data?.users) ? data.users : [];
  return cachedUsers;
}

export async function authenticate({ username, password }) {
  // Simulate network latency for UX while waiting on API.
  await new Promise((resolve) => setTimeout(resolve, 550));

  const sanitizedUsername = (username || "").trim();
  const sanitizedPassword = password || "";

  if (!sanitizedUsername || !sanitizedPassword) {
    return {
      ok: false,
      message: "Username and password are required.",
    };
  }

  let users;

  try {
    users = await fetchUsersFromApi();
  } catch (err) {
    // If the REST call fails (e.g., offline), fall back to bundled demo creds.
    users = DEMO_FALLBACK;
  }

  const match = users.find(
    (user) => user.username.toLowerCase() === sanitizedUsername.toLowerCase()
  );

  if (match && match.password === sanitizedPassword) {
    return {
      ok: true,
      user: {
        username: match.username,
        displayName: match.displayName || match.username,
      },
    };
  }

  return {
    ok: false,
    message: "Invalid username or password.",
  };
}
