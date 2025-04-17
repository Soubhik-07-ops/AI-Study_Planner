// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import Navbar from './components/layout/Navbar';
import SubjectDifficultyPage from './pages/SubjectDifficultyPage';
import StudyPlanPage from './pages/StudyPlanPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/subject-difficulty" element={<SubjectDifficultyPage />} />
            <Route path="/study-plan" element={<StudyPlanPage />} /> {/* ✅ Study Plan Route */}
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>

      {/* ✅ Toast notifications setup */}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </Router>
  );
}

export default App;
