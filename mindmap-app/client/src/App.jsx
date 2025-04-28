import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import MindMapEditorPage from './pages/MindMapEditorPage';
import AuthContext from './contexts/AuthContext';
import { MindMapProvider } from './contexts/MindMapContext';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        <Route
          path="/dashboard"
          element={user ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/mindmap/:id"
          element={user ? <MindMapProvider><MindMapEditorPage /></MindMapProvider> : <Navigate to="/login" />}
        />
        {/* Redirect to dashboard if logged in, otherwise to login */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
