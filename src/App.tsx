import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './pages/DashboardPage';
import { CandidatesPage } from './pages/CandidatesPage';
import { JobsPage } from './pages/JobsPage';
import { PresentationsPage } from './pages/PresentationsPage';
import { EmployersPage } from './pages/EmployersPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CandidatesProvider } from './contexts/CandidatesContext';
import { JobsProvider } from './contexts/JobsContext';
import { PresentationsProvider } from './contexts/PresentationsContext';
import { EmployersProvider } from './contexts/EmployersContext';

function App() {
  return (
    <CandidatesProvider>
      <JobsProvider>
        <PresentationsProvider>
          <EmployersProvider>
            <Router>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="candidates" element={<CandidatesPage />} />
                  <Route path="jobs" element={<JobsPage />} />
                  <Route path="presentations" element={<PresentationsPage />} />
                  <Route path="employers" element={<EmployersPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </Router>
          </EmployersProvider>
        </PresentationsProvider>
      </JobsProvider>
    </CandidatesProvider>
  );
}

export default App;