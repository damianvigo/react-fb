import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

const Title = ({ text }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return;
  }

  return (
    <div className="text-center">
      <h1 className=" my-5 text-3xl">{text}</h1>
      {user.email && <p>{user.email}</p>}
    </div>
  );
};

export default Title;
