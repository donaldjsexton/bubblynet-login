import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import ConfirmationPage from "./components/ConfirmationPage";
import { authenticate } from "./auth/authService";

function App() {
  const [authState, setAuthState] = useState({
    status: "unauthenticated", // "unauthenticated" | "authenticating" | "authenticated"
    user: null,
    error: "",
  });

  const handleLogin = async (credentials) => {
    setAuthState({
      status: "authenticating",
      user: null,
      error: "",
    });

    try {
      const result = await authenticate(credentials);

      if (!result.ok) {
        setAuthState({
          status: "unauthenticated",
          user: null,
          error: result.message || "Unable to sign in. Please try again.",
        });
        return;
      }

      setAuthState({
        status: "authenticated",
        user: result.user || { username: credentials.username },
        error: "",
      });
    } catch (err) {
      setAuthState({
        status: "unauthenticated",
        user: null,
        error: "We couldn’t sign you in right now. Please try again.",
      });
    }
  };

  const handleSignOut = () => {
    setAuthState({
      status: "unauthenticated",
      user: null,
      error: "",
    });
  };

  if (authState.status === "authenticated") {
    return <ConfirmationPage user={authState.user} onSignOut={handleSignOut} />;
  }

  return (
    <LoginPage
      onSubmit={handleLogin}
      authError={authState.error}
      isSubmitting={authState.status === "authenticating"}
    />
  );
}

export default App;
