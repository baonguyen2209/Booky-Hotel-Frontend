/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom';
import { isAdmin, isAuthenticated } from './ApiFunction';


// export const ProtectedRoute = ({ children }) => {
//   const location = useLocation();

//   return isAuthenticated() ? (
//     children
//   ) : (
//     <Navigate to="/login" replace state={{ path: location.pathname }} />
//   );
// };


// export const AdminRoute = ({ children }) => {
//   const location = useLocation();

//   return isAdmin() ? (
//     children
//   ) : (
//     <Navigate to="/login" replace state={{ path: location.pathname }} />
//   );
// };
export const ProtectedRoute = ({ element: Component }) => {
  const location = useLocation();

  return isAuthenticated() ? (
    Component
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};


export const AdminRoute = ({ element: Component }) => {
  const location = useLocation();

  return isAdmin() ? (
    Component
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};