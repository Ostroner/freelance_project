import { FlashBanner } from "./FlashBanner.jsx";
import { getInitials } from "../lib/formatters.js";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Overview", to: "/" },
  { label: "Jobs", to: "/jobs" },
  { label: "Publish", to: "/publish" },
  { label: "Account", to: "/account" },
];

export function AppShell({ children, flash, jobsCount, onDismissFlash, sessionUser }) {
  return (
    <div className="page-shell">
      <div className="chrome-frame">
        <header className="topbar">
          <div className="brand-block">
            <p className="eyebrow">Freelance marketplace</p>
            <h1>Control Room</h1>
            <p className="topbar__meta">{jobsCount} open jobs</p>
          </div>

          <div className="topbar__aside">
            <div className="nav-pills">
              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-pill nav-pill--active" : "nav-pill"
                  }
                  end={item.to === "/"}
                  key={item.to}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {sessionUser ? (
              <div className="user-pill">
                <span className="user-pill__avatar">{getInitials(sessionUser.name)}</span>
                <div>
                  <strong>{sessionUser.name}</strong>
                  <span>#{sessionUser.id}</span>
                </div>
              </div>
            ) : (
              <div className="status-pill">
                <span className="status-pill__dot" />
                Ready
              </div>
            )}
          </div>
        </header>

        {flash ? <FlashBanner flash={flash} onDismiss={onDismissFlash} /> : null}

        <main className="main-layout">{children}</main>
      </div>
    </div>
  );
}
