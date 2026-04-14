import { useState } from "react";

export function AuthPanel({ onLogin, onLogout, onRegister, sessionUser }) {
  const [registerPending, setRegisterPending] = useState(false);
  const [loginPending, setLoginPending] = useState(false);

  async function handleRegisterSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      setRegisterPending(true);
      await onRegister({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      });
      event.currentTarget.reset();
    } catch {
      return;
    } finally {
      setRegisterPending(false);
    }
  }

  async function handleLoginSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      setLoginPending(true);
      await onLogin({
        email: formData.get("email"),
        password: formData.get("password"),
      });
      event.currentTarget.reset();
    } catch {
      return;
    } finally {
      setLoginPending(false);
    }
  }

  if (sessionUser) {
    return (
      <section className="panel stack panel--muted">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Session</p>
            <h3>{sessionUser.name}</h3>
          </div>
          <button className="ghost-button" onClick={onLogout} type="button">
            Log out
          </button>
        </div>

        <div className="profile-card">
          <div className="profile-card__avatar">{sessionUser.name.slice(0, 1).toUpperCase()}</div>
          <div>
            <strong>{sessionUser.email}</strong>
            <p>User ID: {sessionUser.id}</p>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-tile">
            <span>Jobs you publish will use this account as the creator.</span>
          </div>
          <div className="info-tile">
            <span>Applications will automatically attach your current user ID.</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="panel stack panel--muted">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Access</p>
          <h3>Register or sign in</h3>
        </div>
      </div>

      <div className="dual-forms">
        <form className="form-card" onSubmit={handleRegisterSubmit}>
          <div>
            <p className="eyebrow">Create account</p>
            <h4>New user</h4>
          </div>

          <label>
            <span>Name</span>
            <input name="name" placeholder="Alex Morgan" required type="text" />
          </label>

          <label>
            <span>Email</span>
            <input name="email" placeholder="alex@example.com" required type="email" />
          </label>

          <label>
            <span>Password</span>
            <input name="password" placeholder="Create a password" required type="password" />
          </label>

          <button className="primary-button" disabled={registerPending} type="submit">
            {registerPending ? "Creating..." : "Register"}
          </button>
        </form>

        <form className="form-card" onSubmit={handleLoginSubmit}>
          <div>
            <p className="eyebrow">Existing account</p>
            <h4>Sign in</h4>
          </div>

          <label>
            <span>Email</span>
            <input name="email" placeholder="alex@example.com" required type="email" />
          </label>

          <label>
            <span>Password</span>
            <input name="password" placeholder="Your password" required type="password" />
          </label>

          <button className="primary-button" disabled={loginPending} type="submit">
            {loginPending ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}
