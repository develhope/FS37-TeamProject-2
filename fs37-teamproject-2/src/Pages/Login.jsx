// pages/LoginPage.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { /* ... */ };
    await login(userData);
    navigate(from, { replace: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* campi email/password */}
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
