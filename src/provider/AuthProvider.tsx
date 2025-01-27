import auth from "@/firebase/firebase.init";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  UserCredential,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";

type TContext = {
  user: FirebaseUser | null;
  setUser: any;
  loading: any;
  setLoading: any;
  logOut: any;
  createUser: (
    email: string,
    password: string,
    displayName: string,
    photoURL: string
  ) => Promise<UserCredential>;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
};

export const AuthContext = createContext<TContext | null>(null);

const AuthProviders = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const createUser = (
    email: string,
    password: string,
    displayName: string,
    photoURL: string
  ): Promise<UserCredential> => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: displayName,
          photoURL: photoURL,
        }).then(() => {
          return userCredential; // Always return UserCredential
        });
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        throw err; // Ensure consistent return type
      });
  };

  const logOut = () => {
    return signOut(auth);
  };

  const loginUser = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("state captured", currentUser?.email);
      if (currentUser?.email) {
        const user = { email: currentUser.email };
        axios
          .post("https://blood-bridge-server-lime.vercel.app/jwt", user)
          .then((res) => {
            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token);
              setLoading(false);
            }
          });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      return unSubscribe();
    };
  }, []);

  const authInfo: TContext = {
    user,
    createUser,
    loginUser,
    setUser,
    setLoading,
    loading,
    logOut,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
