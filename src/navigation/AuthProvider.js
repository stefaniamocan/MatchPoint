import React, {useState, createContext} from 'react';
import {authentication} from '../api/firebase';
import {db} from '../api/firebase';
import {
  createUserWithEmailAndPassword,
  setPersistence,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from '@firebase/auth';
import {collection, getDocs, setDoc, doc, addDoc} from 'firebase/firestore';
import useAuthentication from '../hooks/useAuthentication';
import {} from 'firebase/auth';

const setUserFirestore = (usernamefirestore, uidfirestore, level) => {
  setDoc(doc(db, 'users', uidfirestore), {
    name: usernamefirestore,
    uid: uidfirestore,
    level: level,
  });
};
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userLevel, setUserLevel] = useState(null);
  const [useremail, setuseremail] = useState(null);
  const [userpassword, setuserpassword] = useState(null);
  const [usercpassword, setcpassword] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userName,
        setUserName,
        userLevel,
        setUserLevel,
        useremail,
        setuseremail,
        userpassword,
        setuserpassword,
        usercpassword,
        setcpassword,
        handleSignUp: level => {
          if (userpassword !== usercpassword) {
            alert('Passwords do not match.');
          } else {
            createUserWithEmailAndPassword(
              authentication,
              useremail.trim(),
              userpassword,
            )
              .then(re => {
                console.log(re);
                const user = re.user;
                setUserFirestore(userName, user.uid, level);
              })
              .catch((error, re) => {
                alert(error.message);
                console.log(re);
              });
          }
        },
        logout: async () => {
          try {
            await authentication.signOut();
            console.log('User loged out!');
            console.log(user);
          } catch (err) {
            alert(err.message);
          }
        },
      }}></AuthContext.Provider>
  );
};
