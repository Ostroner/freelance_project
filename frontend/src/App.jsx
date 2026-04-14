import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell.jsx";
import { useFreelanceApp } from "./hooks/useFreelanceApp.js";
import { AccountPage } from "./pages/AccountPage.jsx";
import { JobsPage } from "./pages/JobsPage.jsx";
import { OverviewPage } from "./pages/OverviewPage.jsx";
import { PublishPage } from "./pages/PublishPage.jsx";

export default function App() {
  const app = useFreelanceApp();

  return (
    <BrowserRouter basename="/app">
      <AppShell
        flash={app.flash}
        jobsCount={app.jobs.length}
        onDismissFlash={app.dismissFlash}
        sessionUser={app.sessionUser}
      >
        <Routes>
          <Route
            element={
              <OverviewPage
                health={app.health}
                jobs={app.jobs}
                jobsLoading={app.jobsLoading}
                onRefresh={app.refreshDashboard}
                sessionUser={app.sessionUser}
              />
            }
            path="/"
          />
          <Route
            element={
              <JobsPage
                activeApplicantsJobId={app.activeApplicantsJobId}
                applicantsByJob={app.applicantsByJob}
                jobs={app.filteredJobs}
                jobsError={app.jobsError}
                jobsLoading={app.jobsLoading}
                loadingApplicantsJobId={app.loadingApplicantsJobId}
                onSearchChange={app.setSearchQuery}
                onSubmitApplication={app.submitApplication}
                onToggleApplicants={app.toggleApplicants}
                onToggleApply={app.toggleApplication}
                openApplicationJobId={app.openApplicationJobId}
                searchQuery={app.searchQuery}
                sessionUser={app.sessionUser}
              />
            }
            path="/jobs"
          />
          <Route
            element={
              <PublishPage
                jobs={app.jobs}
                jobsLoading={app.jobsLoading}
                onCreateJob={app.createJob}
                sessionUser={app.sessionUser}
              />
            }
            path="/publish"
          />
          <Route
            element={
              <AccountPage
                onLogin={app.login}
                onLogout={app.logout}
                onRegister={app.register}
                sessionUser={app.sessionUser}
              />
            }
            path="/account"
          />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
