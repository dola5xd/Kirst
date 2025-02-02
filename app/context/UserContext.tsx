"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../_lib/firebase";
import { addressType } from "../_components/AllAddresses";

export type userType = {
  firstName?: string;
  lastName?: string;
  email?: string | null;
  phone?: string | null;
  address?: addressType[] | null;
  wishlist?: string[] | null;
  cart?: { id: string; quantity: number; size: string }[] | null;
  photoURL?: string | null;
  createdAt?: string;
  userID?: string;
  customerID?: string;
};

export type userContext = {
  user: userType | null;
  setUser: React.Dispatch<React.SetStateAction<userType | null>>;
  loading: boolean;
};

const UserContext = createContext<userContext | null>(null);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<userType | null>(null);

  const [loading, setLoading] = useState(true);

  const fetchUserData = async (firebaseUser: User) => {
    try {
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: firebaseUser.email,
          phone: userData.phone || null,
          address: userData.address || null,
          wishlist: userData.wishlist || [],
          cart: userData.cart || [],
          photoURL: firebaseUser.photoURL || userData.photoURL || null,
          createdAt: userData.createdAt,
          userID: firebaseUser.uid,
          customerID: userData.customerID,
        });
      } else {
        setUser({
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL || null,
          userID: firebaseUser.uid,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to fetch user data from Firestore");
      } else {
        toast.error("Unknown Error!");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await fetchUserData(firebaseUser);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem("user", JSON.stringify(user));
    } else {
      window.localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = function () {
  const userContext = useContext(UserContext);
  if (!userContext) throw new Error("Context in invalid position!");
  return userContext;
};
