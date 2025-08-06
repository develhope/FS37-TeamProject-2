// pages/LoginPage.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { userId, email, password };
    try {
    await login(userData);
    navigate({ replace: true });
  }
      catch (err) {
      console.error('Errore di login:', err);
    }
  };


  return (
    <>
       <div>
      <h2>Benvenuto, {userId} </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    </>
    
  );
}

export default Login;


