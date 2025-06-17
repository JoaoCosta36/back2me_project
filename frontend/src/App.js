import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import RegisterItemPage from './pages/RegisterItemPage'; // Confirme que existe
import ScanPage from './pages/ScanPage';
import SuccessPage from './pages/SuccessPage';
import ProfilePage from './pages/ProfilePage'; // Importado aqui
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // Confirme que existe

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
          <Route path="/scan/:public_token" element={<ScanPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;