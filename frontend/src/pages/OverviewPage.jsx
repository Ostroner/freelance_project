import { Link } from "react-router-dom";
import { EmptyState } from "../components/EmptyState.jsx";
import { HeroSection } from "../components/HeroSection.jsx";
import { formatCurrency, formatDate } from "../lib/formatters.js";

function OverviewCard({ cta, text, title, to }) {
  return (
    <article className="overview-card">
      <h3>{title}</h3>
      <p>{text}</p>
      <Link className="ghost-button" to={to}>
        {cta}
      </Link>
    </article>
  );
}

export function OverviewPage({ health, jobs, jobsLoading, onRefresh, sessionUser }) {
  const latestJobs = jobs.slice(0, 3);

  return (
    <>
      <HeroSection health={health} jobs={jobs} onRefresh={onRefresh} />

      <section className="overview-grid">
        <div className="panel stack panel--muted">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Pages</p>
              <h3>Move by task</h3>
            </div>
          </div>

          <div className="overview-card-grid">
            <OverviewCard
              cta="Jobs"
              text="Browse listings and review applicants."
              title="Jobs"
              to="/jobs"
            />
            <OverviewCard
              cta="Publish"
              text="Create and post new work."
              title="Publish"
              to="/publish"
            />
            <OverviewCard
              cta="Account"
              text="Sign in or manage the current session."
              title="Account"
              to="/account"
            />
          </div>
        </div>

        <div className="panel stack panel--board">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Latest</p>
              <h3>Recent jobs</h3>
            </div>
          </div>

          {jobsLoading ? (
            <div className="loading-block">Loading recent jobs...</div>
          ) : latestJobs.length ? (
            <div className="overview-list">
              {latestJobs.map((job) => (
                <article className="overview-list__item" key={job.id}>
                  <div>
                    <strong>{job.title}</strong>
                    <p>
                      {job.creator?.name || "Unknown client"} | {formatDate(job.createdAt)}
                    </p>
                  </div>
                  <span>{formatCurrency(job.budget)}</span>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              message="Once jobs exist, the overview page will surface them here."
              title="No listings to preview"
            />
          )}
        </div>
      </section>

      <section className="panel stack panel--accent">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Session</p>
            <h3>{sessionUser ? "Signed in and ready" : "No active session yet"}</h3>
            <p className="section-copy">
              {sessionUser
                ? `Current operator: ${sessionUser.name}. You can publish jobs and apply using this account.`
                : "Login is still required for job publishing and job applications."}
            </p>
          </div>
          <Link className="primary-button" to={sessionUser ? "/publish" : "/account"}>
            {sessionUser ? "Publish" : "Account"}
          </Link>
        </div>
      </section>
    </>
  );
}
