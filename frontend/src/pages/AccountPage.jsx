import { Link } from "react-router-dom";
import { AuthPanel } from "../components/AuthPanel.jsx";

export function AccountPage({ onLogin, onLogout, onRegister, sessionUser }) {
  return (
    <>
      <section className="page-header">
        <p className="eyebrow">Account</p>
        <h2>Manage the current session.</h2>
      </section>

      <section className="workspace-grid">
        <AuthPanel
          onLogin={onLogin}
          onLogout={onLogout}
          onRegister={onRegister}
          sessionUser={sessionUser}
        />
      </section>
    </>
  );
}
