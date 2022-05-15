import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickLogin = () => {
    setUser(true);
    navigate('/');
  };
  return (
    <>
      <h1>Login</h1>
      <h2>{user ? 'En linea' : 'Offline'}</h2>
      <button onClick={handleClickLogin}>Acceder</button>
    </>
  );
};

export default Login;
