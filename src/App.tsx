import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import AgentPerformance from './pages/AgentPerformance';
import CustomerInsights from './pages/CustomerInsights';
import CallReview from './pages/CallReview';
import BusinessOutcomes from './pages/BusinessOutcomes';
import Login from './pages/Login';
import { ThemeProvider } from './context/ThemeContext';

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Check if user is logged in
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Login route */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected dashboard routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="agent-performance" element={<AgentPerformance />} />
            <Route path="customer-insights" element={<CustomerInsights />} />
            <Route path="call-review" element={<CallReview />} />
            <Route path="business-outcomes" element={<BusinessOutcomes />} />
          </Route>

          {/* Redirect all unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 