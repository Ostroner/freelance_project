import { formatCurrency } from "../lib/formatters.js";

export function HeroSection({ health, jobs, onRefresh }) {
  const totalBudget = jobs.reduce((sum, job) => sum + (Number(job.budget) || 0), 0);
  const healthState = health?.status === "ok" ? "Online" : "Checking";
  const healthClass = health?.status === "ok" ? "healthy" : "checking";

  return (
    <section className="hero panel">
      <div className="hero__content">
        <p className="eyebrow">Overview</p>
        <h2>looking for jobs, applicants?</h2>
        <p className="hero__lead">
          an open source job board built with react, node, express, and postgres. designed to be a simple starting point for freelance marketplaces, staffing agencies, or anyone looking to connect talent with opportunity.
        </p>

        <div className="hero__actions">
          <button className="primary-button" onClick={() => onRefresh({ announce: true })} type="button">
            Refresh
          </button>
          
        </div>
      </div>

      <div className="hero__stats">
        <article className="stat-card">
          <span>Open jobs</span>
          <strong>{jobs.length}</strong>
          <small>Current listings</small>
        </article>

        <article className="stat-card">
          <span>Total budget</span>
          <strong>{formatCurrency(totalBudget)}</strong>
          <small>Across all jobs</small>
        </article>
      </div>
    </section>
  );
}
