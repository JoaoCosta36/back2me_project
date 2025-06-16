import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import RegisterItemPage from './pages/RegisterItemPage';
import ScanPage from './pages/ScanPage';
import SuccessPage from './pages/SuccessPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register-item"
            element={
              <ProtectedRoute>
                <RegisterItemPage />
              </ProtectedRoute>
            }
          />
          <Route path="/scan/:itemId" element={<ScanPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
