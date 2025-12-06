import React from "react";

function ConfirmationPage({ user, onSignOut }) {
  const displayName = (user && (user.displayName || user.username)) || "User";

  return (
    <div className="auth-page">
      <main className="auth-card" aria-labelledby="confirm-title">
        <header className="confirm-header">
          <h1 id="confirm-title">You’re signed in.</h1>
          <p className="confirm-subtitle">
            Welcome back, <strong>{displayName}</strong>.
          </p>
        </header>

        <section className="confirm-body">
          <p>
            This page confirms that authentication succeeded. In a full
            application, this is where you’d route users to their dashboard,
            device view, or another role-based landing page.
          </p>
        </section>

        <div className="confirm-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => {
              alert("Continue to dashboard (placeholder).");
            }}
          >
            Continue
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={onSignOut}
          >
            Sign Out
          </button>
        </div>
      </main>
    </div>
  );
}

export default ConfirmationPage;
