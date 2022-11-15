import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ROUTE_PATHS } from '../utils/RoutePaths';

const ProtectedRoute = ({ component: Component, ...props  }) => {
  return (
    <Route>
      {
        () => localStorage.getItem('loggedIn') ? <Component {...props} /> : <Redirect to={ROUTE_PATHS.main} />
      }
    </Route>
)}

export default ProtectedRoute;