const JSON_HEADERS = {
  "Content-Type": "application/json",
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: JSON_HEADERS,
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload !== null
        ? payload.error || payload.message || "Request failed"
        : "Request failed";
    throw new Error(message);
  }

  return payload;
}

export function getHealth() {
  return request("/health");
}

export function getJobs() {
  return request("/jobs");
}

export function registerUser(data) {
  return request("/users/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function loginUser(data) {
  return request("/users/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function createJob(data) {
  return request("/jobs", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function applyForJob(jobId, data) {
  return request(`/applications/${jobId}/apply`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getApplicants(jobId) {
  return request(`/applications/${jobId}/applicants`);
}
