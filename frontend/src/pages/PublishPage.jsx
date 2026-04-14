import { Link } from "react-router-dom";
import { CreateJobPanel } from "../components/CreateJobPanel.jsx";
import { EmptyState } from "../components/EmptyState.jsx";
import { formatCurrency } from "../lib/formatters.js";

export function PublishPage({ jobs, jobsLoading, onCreateJob, sessionUser }) {
  const latestPublished = jobs.slice(0, 4);

  return (
    <>
      <section className="page-header">
        <p className="eyebrow">Publish</p>
        <h2>Create a new job.</h2>
      </section>

      <section className="workspace-grid">
        <CreateJobPanel onCreateJob={onCreateJob} sessionUser={sessionUser} />

        <section className="panel stack panel--muted">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Notes</p>
              <h3>Keep it clear</h3>
            </div>
          </div>

          <div className="info-grid info-grid--single">
            <div className="info-tile">
              <span>Use a title that names the actual deliverable.</span>
            </div>
            <div className="info-tile">
              <span>Describe the scope so applicants know what matters.</span>
            </div>
            <div className="info-tile">
              <span>Set a budget that matches the job size.</span>
            </div>
          </div>

          <Link className="ghost-button" to="/jobs">
            View jobs
          </Link>
        </section>
      </section>

      <section className="panel stack panel--board">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Recent</p>
            <h3>Latest jobs</h3>
          </div>
        </div>

        {jobsLoading ? (
          <div className="loading-block">Loading recent jobs...</div>
        ) : latestPublished.length ? (
          <div className="overview-list">
            {latestPublished.map((job) => (
              <article className="overview-list__item" key={job.id}>
                <div>
                  <strong>{job.title}</strong>
                  <p>{job.creator?.name || "Unknown client"}</p>
                </div>
                <span>{formatCurrency(job.budget)}</span>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            message="Publish your first opportunity to populate this page."
            title="No published jobs yet"
          />
        )}
      </section>
    </>
  );
}
