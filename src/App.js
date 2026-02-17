import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ExpenseList from './ExpenseList';
import Sidebar from './Sidebar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-[var(--background)]">
        {isLoggedIn && (
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
          />
        )}

        <main className={`flex-1 overflow-x-hidden ${isLoggedIn ? 'lg:pl-0' : ''}`}>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <div className="h-full">
                    <ExpenseList activeTab={activeTab} />
                  </div>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={<Login onLogin={() => setIsLoggedIn(true)} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
