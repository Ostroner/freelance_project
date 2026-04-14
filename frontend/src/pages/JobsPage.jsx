import { JobBoard } from "../components/JobBoard.jsx";

export function JobsPage(props) {
  return (
    <>
      <section className="page-header">
        <p className="eyebrow">Jobs</p>
        <h2>Browse jobs and applicants.</h2>
      </section>

      <JobBoard {...props} />
    </>
  );
}
