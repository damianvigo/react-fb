import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';

const LayoutRequireAuth = (/* props */) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  /* return props.children; */
  return (
    <div className="container  sm:max-w-lg md:max-w-2xl mx-auto">
      <Outlet />
    </div>
  );
};

export default LayoutRequireAuth;
