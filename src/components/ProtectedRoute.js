import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ROUTE_PATH } from '../utils/Constants';

const ProtectedRoute = ({ component: Component, ...props  }) => {
  return (
    <Route>
      {
        () => JSON.parse(localStorage.getItem('loggedIn')) ? <Component {...props} /> : <Redirect to={ROUTE_PATH.main} />
      }
    </Route>
)}

export default ProtectedRoute;