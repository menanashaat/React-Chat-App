import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './pages/Login';
import ChatPage from './pages/ChatPage';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './store/context/ThemeContext';
import { ThemeWrapper } from './components/layout/ThemeWrapper';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                 <ThemeProvider>
                  <ThemeWrapper>
                    <ChatPage />
                  </ThemeWrapper>
                </ThemeProvider>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;