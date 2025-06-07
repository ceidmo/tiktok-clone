import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Optional: Accept roles if you plan to restrict access by user role
const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, loading } = useAuth(); // assumes your AuthContext provides `user` and `loading`
  const location = useLocation();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (user && roles.length > 0) {
      // Optional: role-based access logic
      setHasAccess(roles.includes(user.role));
    } else {
      setHasAccess(true); // No role restriction
    }
  }, [user, roles]);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to login, keep intended path for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

const styles = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
    color: '#555',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '5px solid rgba(0,0,0,0.1)',
    borderTopColor: '#3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

// Simple CSS spinner animation
const spinnerStyle = document.createElement('style');
spinnerStyle.innerHTML = `
@keyframes spin {
  to { transform: rotate(360deg); }
}`;
document.head.appendChild(spinnerStyle);

export default ProtectedRoute;