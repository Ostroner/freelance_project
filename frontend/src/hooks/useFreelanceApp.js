import { startTransition, useDeferredValue, useEffect, useState } from "react";
import {
  applyForJob,
  createJob,
  getApplicants,
  getHealth,
  getJobs,
  loginUser,
  registerUser,
} from "../lib/api.js";

const STORAGE_KEY = "freelance-sessionuser";

function readStoredUser() {
  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch {
    return null;
  }
}

function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roleId: user.roleId ?? null,
  };
}

export function useFreelanceApp() {
  const [health, setHealth] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [jobsError, setJobsError] = useState("");
  const [jobsLoading, setJobsLoading] = useState(true);
  const [sessionUser, setSessionUser] = useState(readStoredUser);
  const [flash, setFlash] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openApplicationJobId, setOpenApplicationJobId] = useState(null);
  const [activeApplicantsJobId, setActiveApplicantsJobId] = useState(null);
  const [applicantsByJob, setApplicantsByJob] = useState({});
  const [loadingApplicantsJobId, setLoadingApplicantsJobId] = useState(null);
  const deferredSearchQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    void refreshDashboard();
  }, []);

  useEffect(() => {
    if (!sessionUser) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
  }, [sessionUser]);

  const normalizedQuery = deferredSearchQuery.trim().toLowerCase();
  const filteredJobs = normalizedQuery
    ? jobs.filter((job) => {
        const haystack = `${job.title} ${job.description} ${job.creator?.name || ""}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      })
    : jobs;

  function showFlash(type, title, message) {
    setFlash({ type, title, message });
  }

  function dismissFlash() {
    setFlash(null);
  }

  async function refreshDashboard({ announce = false } = {}) {
    setJobsLoading(true);
    setJobsError("");

    const [healthResult, jobsResult] = await Promise.allSettled([
      getHealth(),
      getJobs(),
    ]);

    if (healthResult.status === "fulfilled") {
      setHealth(healthResult.value);
    } else {
      setHealth({ status: "down" });
    }

    if (jobsResult.status === "fulfilled") {
      startTransition(() => {
        setJobs(jobsResult.value);
      });
      setJobsError("");
    } else {
      setJobs([]);
      setJobsError(jobsResult.reason.message);
    }

    setJobsLoading(false);

    if (announce) {
      showFlash(
        "success",
        "Board refreshed",
        "Jobs and platform status were fetched from the backend."
      );
    }
  }

  async function register(payload) {
    try {
      const result = await registerUser(payload);
      const user = sanitizeUser(result.user);
      setSessionUser(user);
      showFlash(
        "success",
        "Account created",
        "You are now signed in and can publish or apply immediately."
      );
    } catch (error) {
      showFlash("error", "Registration failed", error.message);
      throw error;
    }
  }

  async function login(payload) {
    try {
      const result = await loginUser(payload);
      const user = sanitizeUser(result.user);
      setSessionUser(user);
      showFlash(
        "success",
        "Login successful",
        "Your session is active and ready for job actions."
      );
    } catch (error) {
      showFlash("error", "Login failed", error.message);
      throw error;
    }
  }

  function logout() {
    setSessionUser(null);
    setOpenApplicationJobId(null);
    showFlash("success", "Logged out", "The browser session was cleared.");
  }

  async function createJobForUser(payload) {
    if (!sessionUser) {
      throw new Error("Please login before creating a job.");
    }

    try {
      await createJob({
        ...payload,
        userId: sessionUser.id,
      });

      await refreshDashboard();
      showFlash("success", "Job published", "Your new listing is live on the board.");
    } catch (error) {
      showFlash("error", "Job creation failed", error.message);
      throw error;
    }
  }

  function toggleApplication(jobId) {
    setOpenApplicationJobId((current) => (current === jobId ? null : jobId));
  }

  async function submitApplication(jobId, coverLetter) {
    if (!sessionUser) {
      throw new Error("Please login before applying.");
    }

    try {
      await applyForJob(jobId, {
        userId: sessionUser.id,
        coverLetter,
      });

      setOpenApplicationJobId(null);
      showFlash(
        "success",
        "Application sent",
        "Your cover letter has been submitted successfully."
      );
    } catch (error) {
      showFlash("error", "Application failed", error.message);
      throw error;
    }
  }

  async function toggleApplicants(jobId) {
    if (activeApplicantsJobId === jobId) {
      setActiveApplicantsJobId(null);
      setLoadingApplicantsJobId(null);
      return;
    }

    setActiveApplicantsJobId(jobId);
    setLoadingApplicantsJobId(jobId);

    try {
      const applicants = await getApplicants(jobId);
      setApplicantsByJob((current) => ({
        ...current,
        [jobId]: applicants,
      }));
    } catch (error) {
      showFlash("error", "Applicants unavailable", error.message);
    } finally {
      setLoadingApplicantsJobId(null);
    }
  }

  return {
    activeApplicantsJobId,
    applicantsByJob,
    createJob: createJobForUser,
    dismissFlash,
    filteredJobs,
    flash,
    health,
    jobs,
    jobsError,
    jobsLoading,
    loadingApplicantsJobId,
    login,
    logout,
    openApplicationJobId,
    refreshDashboard,
    register,
    searchQuery,
    sessionUser,
    setSearchQuery,
    submitApplication,
    toggleApplicants,
    toggleApplication,
  };
}
