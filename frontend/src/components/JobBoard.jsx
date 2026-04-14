import { EmptyState } from "./EmptyState.jsx";
import { JobCard } from "./JobCard.jsx";

export function JobBoard({
  activeApplicantsJobId,
  applicantsByJob,
  jobs,
  jobsError,
  jobsLoading,
  loadingApplicantsJobId,
  onSearchChange,
  onSubmitApplication,
  onToggleApplicants,
  onToggleApply,
  openApplicationJobId,
  searchQuery,
  sessionUser,
}) {
  return (
    <section className="panel stack panel--board">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Jobs</p>
          <h3>Open listings</h3>
        </div>
        <div className="count-pill">{jobs.length}</div>
      </div>

      <div className="toolbar">
        <label className="search-field">
          <input
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search jobs"
            type="search"
            value={searchQuery}
          />
        </label>
      </div>

      {jobsLoading ? <div className="loading-block">Loading jobs from the backend...</div> : null}

      {!jobsLoading && jobsError ? (
        <EmptyState message={jobsError} title="Unable to load jobs" />
      ) : null}

      {!jobsLoading && !jobsError && !jobs.length ? (
        <EmptyState
          message="Create the first listing from the publishing panel to populate the board."
          title="No jobs published yet"
        />
      ) : null}

      {!jobsLoading && !jobsError && jobs.length ? (
        <div className="job-grid">
          {jobs.map((job) => (
            <JobCard
              activeApplicantsJobId={activeApplicantsJobId}
              applicants={applicantsByJob[job.id] || []}
              isApplicantsLoading={loadingApplicantsJobId === job.id}
              isApplyOpen={openApplicationJobId === job.id}
              job={job}
              key={job.id}
              onSubmitApplication={onSubmitApplication}
              onToggleApplicants={onToggleApplicants}
              onToggleApply={onToggleApply}
              sessionUser={sessionUser}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
