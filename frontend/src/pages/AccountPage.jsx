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

        <section className="panel stack panel--board">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Details</p>
              <h3>{sessionUser ? "Operator confirmed" : "Authentication required"}</h3>
              <p className="section-copy">
                {sessionUser
                  ? "This account will be used for publish and apply actions."
                  : "Viewing jobs is open, but publish and apply actions still require a session."}
              </p>
            </div>
          </div>

          <div className="info-grid info-grid--single">
            <div className="info-tile">
              <span>Publishing uses the logged-in user ID as the creator.</span>
            </div>
            <div className="info-tile">
              <span>Applications attach the same user ID with each cover letter.</span>
            </div>
            <div className="info-tile">
              <span>The backend currently uses simple email and password matching.</span>
            </div>
          </div>

          <div className="hero__actions">
            <Link className="ghost-button" to="/jobs">
              Jobs
            </Link>
            <Link className="primary-button" to="/publish">
              Publish
            </Link>
          </div>
        </section>
      </section>
    </>
  );
}
