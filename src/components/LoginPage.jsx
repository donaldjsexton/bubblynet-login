import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/BNLOGOWHITE.webp"; // or "../logo.svg" etc.

function LoginPage({ onSubmit, authError, isSubmitting }) {
  const [values, setValues] = useState({ username: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const usernameRef = useRef(null);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const errors = {};

    if (!values.username.trim()) {
      errors.username = "Please enter your username or email.";
    }

    if (!values.password.trim()) {
      errors.password = "Please enter your password.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    // Do not log credentials. Just forward them to the handler.
    onSubmit({
      username: values.username.trim(),
      password: values.password,
    });
  };

  return (
    <div className="auth-page">
      <main className="auth-card" aria-labelledby="auth-title">
        <header className="auth-header">
          {logo && <img src={logo} alt="Company logo" className="auth-logo" />}
          <div>
            <h1 id="auth-title">Cloud Sign-In</h1>
            <p className="auth-subtitle">Sign in to access your workspace.</p>
          </div>
        </header>

        {authError && (
          <div className="auth-error" role="alert">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="username">Username or email</label>
            <input
              ref={usernameRef}
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={values.username}
              onChange={handleChange}
            />
            {fieldErrors.username && (
              <p className="field-error">{fieldErrors.username}</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="password-row">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="link-button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="field-error">{fieldErrors.password}</p>
            )}
          </div>

          <div className="field field-row">
            <label className="checkbox">
              <input type="checkbox" name="remember" />
              <span>Remember this device</span>
            </label>
            <button type="button" className="link-button">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="primary-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <footer className="auth-footer">
          <button type="button" className="support-link">
            Need help? Contact support.
          </button>
          <p className="legal-text">
            By signing in, you agree to the Terms and Privacy Policy.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default LoginPage;
