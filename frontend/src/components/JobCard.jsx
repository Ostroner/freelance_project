import { useState } from "react";
import { formatCurrency, formatDate, getInitials } from "../lib/formatters.js";
import { EmptyState } from "./EmptyState.jsx";

function ApplicantList({ applicants }) {
  if (!applicants.length) {
    return (
      <EmptyState
        message="When freelancers apply for this role, they will appear here."
        title="No applicants yet"
      />
    );
  }

  return (
    <div className="applicant-list">
      {applicants.map((application) => (
        <article className="applicant-card" key={application.id}>
          <div className="applicant-card__header">
            <div className="user-pill">
              <span className="user-pill__avatar">
                {getInitials(application.applicant?.name)}
              </span>
              <div>
                <strong>{application.applicant?.name || "Unknown applicant"}</strong>
                <span>{application.applicant?.email || "No email provided"}</span>
              </div>
            </div>
            <small>{formatDate(application.createdAt)}</small>
          </div>

          <p>{application.coverLetter || "No cover letter submitted."}</p>
        </article>
      ))}
    </div>
  );
}

export function JobCard({
  activeApplicantsJobId,
  applicants,
  isApplicantsLoading,
  isApplyOpen,
  job,
  onSubmitApplication,
  onToggleApplicants,
  onToggleApply,
  sessionUser,
}) {
  const [coverLetter, setCoverLetter] = useState("");
  const [pending, setPending] = useState(false);
  const isApplicantsOpen = activeApplicantsJobId === job.id;

  async function handleApplySubmit(event) {
    event.preventDefault();

    try {
      setPending(true);
      await onSubmitApplication(job.id, coverLetter);
      setCoverLetter("");
    } catch {
      return;
    } finally {
      setPending(false);
    }
  }

  return (
    <article className="job-card">
      <div className="job-card__top">
        <div className="job-card__headline">
          <p className="eyebrow">Job #{job.id}</p>
          <h3>{job.title}</h3>
        </div>
        <div className="budget-chip">{formatCurrency(job.budget)}</div>
      </div>

      <p className="job-card__description">{job.description}</p>

      <div className="job-meta">
        <div>
          <span>Client</span>
          <strong>{job.creator?.name || "Unknown client"}</strong>
        </div>
        <div>
          <span>Posted</span>
          <strong>{formatDate(job.createdAt)}</strong>
        </div>
      </div>

      <div className="job-card__actions">
        <button className="primary-button" onClick={() => onToggleApply(job.id)} type="button">
          {isApplyOpen ? "Close application" : "Apply"}
        </button>

        <button className="ghost-button" onClick={() => onToggleApplicants(job.id)} type="button">
          {isApplicantsOpen ? "Hide applicants" : "View applicants"}
        </button>
      </div>

      {isApplyOpen ? (
        <form className="job-card__detail" onSubmit={handleApplySubmit}>
          <div className="section-heading section-heading--compact">
            <div>
              <p className="eyebrow">Apply now</p>
              <h4>Send your cover letter</h4>
            </div>
          </div>

          {sessionUser ? (
            <>
              <label>
                <span>Cover letter</span>
                <textarea
                  name="coverLetter"
                  onChange={(event) => setCoverLetter(event.target.value)}
                  placeholder="Introduce your experience, availability, and why you fit this project."
                  required
                  rows="4"
                  value={coverLetter}
                />
              </label>

              <button className="primary-button" disabled={pending} type="submit">
                {pending ? "Submitting..." : "Submit application"}
              </button>
            </>
          ) : (
            <EmptyState
              message="Sign in first so the backend can attach your user ID."
              title="Login required"
            />
          )}
        </form>
      ) : null}

      {isApplicantsOpen ? (
        <div className="job-card__detail">
          <div className="section-heading section-heading--compact">
            <div>
              <p className="eyebrow">Applicants</p>
              <h4>Candidate pipeline</h4>
            </div>
          </div>

          {isApplicantsLoading ? (
            <div className="loading-block">Loading applicants...</div>
          ) : (
            <ApplicantList applicants={applicants} />
          )}
        </div>
      ) : null}
    </article>
  );
}
