import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './pages/DashboardPage';
import { CandidatesPage } from './pages/CandidatesPage';
import { CandidateDetailsPage } from './pages/CandidateDetailsPage';
import { JobsPage } from './pages/JobsPage';
import { JobDetailsPage } from './pages/JobDetailsPage';
import { PresentationsPage } from './pages/PresentationsPage';
import { PresentationDetailsPage } from './pages/PresentationDetailsPage';
import { EmployersPage } from './pages/EmployersPage';
import { EmployerDetailsPage } from './pages/EmployerDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CandidatesProvider } from './contexts/CandidatesContext';
import { JobsProvider } from './contexts/JobsContext';
import { PresentationsProvider } from './contexts/PresentationsContext';
import { EmployersProvider } from './contexts/EmployersContext';
import { MessagesProvider } from './contexts/MessagesContext';

function App() {
  return (
    <CandidatesProvider>
      <JobsProvider>
        <PresentationsProvider>
          <EmployersProvider>
            <MessagesProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<MainLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="candidates" element={<CandidatesPage />} />
                    <Route path="candidates/:id" element={<CandidateDetailsPage />} />
                    <Route path="jobs" element={<JobsPage />} />
                    <Route path="jobs/:id" element={<JobDetailsPage />} />
                    <Route path="presentations" element={<PresentationsPage />} />
                    <Route path="presentations/:id" element={<PresentationDetailsPage />} />
                    <Route path="employers" element={<EmployersPage />} />
                    <Route path="employers/:id" element={<EmployerDetailsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>
              </Router>
            </MessagesProvider>
          </EmployersProvider>
        </PresentationsProvider>
      </JobsProvider>
    </CandidatesProvider>
  );
}

export default App