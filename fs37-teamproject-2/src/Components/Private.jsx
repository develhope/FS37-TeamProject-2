// Se user è presente, nel senso che è loggato, renderizza i figli (children), altrimenti esegue un <Navigate> verso /login:
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function Private({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default Private;