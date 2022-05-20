import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    console.log('primer renderizado');
    // onAuthStateChanged es un observable es decir un metodo que va a estar pendiente de algun cambio del usuario
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      console.log('se ejecuto onAuthStateChanged');
      // console.log(user);

      if (user) {
        /* setUser({email: user.email, photoURL: user.photoURL, displayName: user.displayName, uid: user.uid}) */

        const { email, photoURL, displayName, uid } = user;
        setUser({ email, photoURL, displayName, uid });
      } else {
        setUser(null);
      }
    });

    return () => unsuscribe();
  }, []);

  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signOutUser = () => signOut(auth);

  return (
    <UserContext.Provider
      value={{ user, setUser, registerUser, loginUser, signOutUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
