import React from 'react';
import { UserContext } from '../../Contexts/UserContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = React.useContext(UserContext);

  if (loggedIn === true) {
    return children;
  } else if (loggedIn === false) {
    return <Navigate to="/login" />;
  } else {
    return <></>;
  }
};

export default ProtectedRoute;
