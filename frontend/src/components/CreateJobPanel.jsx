import { useState } from "react";
import { EmptyState } from "./EmptyState.jsx";

export function CreateJobPanel({ onCreateJob, sessionUser }) {
  const [pending, setPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      setPending(true);
      await onCreateJob({
        title: formData.get("title"),
        description: formData.get("description"),
        budget: Number(formData.get("budget")),
      });
      event.currentTarget.reset();
    } catch {
      return;
    } finally {
      setPending(false);
    }
  }

  if (!sessionUser) {
    return (
      <section className="panel stack panel--accent">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Publish</p>
            <h3>Create a job</h3>
          </div>
        </div>

        <EmptyState
          message="The backend expects a user ID when creating jobs, so publishing unlocks after login."
          title="Sign in to publish"
        />
      </section>
    );
  }

  return (
    <section className="panel stack panel--accent">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Publish</p>
          <h3>Create a job</h3>
        </div>
      </div>

      <form className="form-card form-card--wide" onSubmit={handleSubmit}>
        <label>
          <span>Job title</span>
          <input
            name="title"
            placeholder="Senior UI engineer for onboarding flow"
            required
            type="text"
          />
        </label>

        <label>
          <span>Description</span>
          <textarea
            name="description"
            placeholder="Describe the scope, deliverables, and what a strong applicant should bring."
            required
            rows="5"
          />
        </label>

        <div className="form-grid">
          <label>
            <span>Budget (USD)</span>
            <input min="0" name="budget" placeholder="2500" required step="50" type="number" />
          </label>

          <label>
            <span>Publisher ID</span>
            <input disabled type="text" value={sessionUser.id} />
          </label>
        </div>

        <button className="primary-button" disabled={pending} type="submit">
          {pending ? "Publishing..." : "Publish job"}
        </button>
      </form>
    </section>
  );
}
