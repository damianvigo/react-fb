import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import LayoutContainerForm from './components/LayoutContainerForm';
import Navbar from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import { UserContext } from './context/UserProvider';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';

const App = () => {
  const { user } = useContext(UserContext);

  // Una espera del usuario, se demora firebase en ver si el usuario esta autenticado o no y mientras tanto eso pase, yo pinto un loading
  if (user === false) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <h1>APP</h1>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        ></Route>
        <Route path="/" element={<LayoutContainerForm />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
