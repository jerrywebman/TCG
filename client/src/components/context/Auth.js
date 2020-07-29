import React, { useEffect, useState } from "react";
import firebase from "../auth/firebase";
import { Spinner } from "reactstrap";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          user.admin = idTokenResult.claims.admin;
          setCurrentUser(user);
          setPending(false);
        });
      } else {
        setCurrentUser(user);
        setPending(false);
      }
    });
  }, [currentUser]);

  if (pending) {
    return (
      <Spinner
        style={{
          width: "10rem",
          height: "10rem",
          color: "#5658DD",
          margin: "40vh 40vw",
        }}
        type="grow"
      />
      // <div>Spinning</div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
