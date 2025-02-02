import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { formType } from "../_components/InformationForm";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addressType } from "../_components/AllAddresses";
import { stripe } from "./stripe";
import { orderType } from "../_components/CartInformations";

export const handleRegister = async (formData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const { email, password, firstName, lastName } = formData;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: `${firstName.trim()} ${lastName.trim()}`,
    });

    const customer = await stripe.customers.create({
      email: user.email!,
      name: `${firstName.trim()} ${lastName.trim()}`,
      metadata: { firebaseUID: user.uid },
    });

    await setDoc(doc(db, "users", user.uid), {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: user.email,
      phone: user.phoneNumber || null,
      photoURL: user.photoURL || null,
      address: null,
      createdAt: new Date().toISOString(),
      userID: user.uid,
      customerID: customer.id,
    });

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData;
    } else {
      throw new Error("User data not found in Firestore.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes("auth/email-already-in-use")) {
        return "Email is already in use. Please use a different email.";
      } else {
        return "Registration failed. Please try again.";
      }
    } else {
      return "An unknown error occurred:" + error;
    }
  }
};

export const handleLogin = async (credentials: {
  email: string;
  password: string;
}) => {
  const { email, password } = credentials;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData;
    } else {
      throw new Error("User data not found in Firestore.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Login failed. Please check your email and password.");
  }
};

export const handleSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    provider.setCustomParameters({ prompt: "select_account" });

    if (!auth) throw new Error("Firebase Auth is not initialized.");

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const displayName = user.displayName || "";
    const [firstName, ...lastNameParts] = displayName.split(" ");
    const lastName = lastNameParts.join(" ");

    await updateProfile(user, {
      displayName: `${firstName.trim()} ${lastName.trim()}`,
    });

    const customer = await stripe.customers.create({
      email: user.email!,
      name: `${firstName.trim()} ${lastName.trim()}`,
      metadata: { firebaseUID: user.uid },
    });

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: user.email,
        phone: user.phoneNumber || null,
        photoURL: user.photoURL || null,
        address: null,
        createdAt: new Date().toISOString(),
        userID: user.uid,
        customerID: customer.id,
      });
    }

    const updatedUserDoc = await getDoc(doc(db, "users", user.uid));
    if (updatedUserDoc.exists()) {
      const userData = updatedUserDoc.data();
      return userData;
    } else {
      throw new Error("User data not found in Firestore.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (
        error.message.includes("auth/account-exists-with-different-credential")
      ) {
        return "An account already exists with this email. Please sign in with the original method.";
      } else {
        return "Sign-in failed. Please try again.";
      }
    } else {
      return "An unknown error occurred:" + error;
    }
  }
};

export const handleSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error: unknown) {
    throw error;
  }
};

export const handleEdits = async (data: formType) => {
  const { firstName, lastName, phone, email } = data;

  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User is Not Auth!");

    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      firstName,
      lastName,
      phone: phone || null,
      email,
    });

    const userDoc = await getDoc(userDocRef);
    return userDoc.data();
  } catch (error) {
    console.error("Error updating document:", error);
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("An unknown error occurred");
  }
};

export const handleFileUpload = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profile_pictures");
    formData.append("quality", "auto:best");
    formData.append("width", "auto");
    formData.append("height", "auto");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    if (!response.ok) throw new Error("Upload failed. Please try again.");

    const data = await response.json();
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { photoURL: data.secure_url });
      await setDoc(
        doc(db, "users", auth.currentUser.uid),
        { photoURL: data.secure_url },
        { merge: true }
      );
      return data.secure_url;
    } else {
      throw new Error("No user is currently signed in.");
    }
  } catch (error) {
    if (error instanceof Error) throw new Error("Error uploading file:");
    else throw new Error("Error uploading file:");
  }
};

export const addNewAddress = async (data: addressType) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No user Auth");

    const docRef = doc(db, "users", user.uid);
    const userData = await getDoc(docRef);
    if (!userData.exists()) throw new Error("Faild to get new Data!");

    const existingAddresses = userData.data().address || [];
    await setDoc(
      docRef,
      { address: [...existingAddresses, data] },
      { merge: true }
    );

    const updatedUserData = await getDoc(docRef);
    if (updatedUserData.exists()) return updatedUserData.data();
    else throw new Error("Faild to get new Data!");
  } catch (error) {
    if (error instanceof Error) throw new Error("Error uploading file:");
    else throw new Error("Error uploading file:");
  }
};

export const removeAddress = async (id: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No user Auth");

    const docRef = doc(db, "users", user.uid);
    const userData = await getDoc(docRef);
    if (!userData.exists()) throw new Error("Failed to get user data!");

    const filteredAddresses =
      userData
        .data()
        .address.filter((address: addressType) => address.id !== id) || [];
    await setDoc(docRef, { address: filteredAddresses }, { merge: true });

    const updatedUserData = await getDoc(docRef);
    if (updatedUserData.exists()) return updatedUserData.data();
    else throw new Error("Failed to get updated data!");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("An unknown error occurred");
  }
};

export const addToWishList = async (productID: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No user Auth");

    const docRef = doc(db, "users", user.uid);
    const userData = await getDoc(docRef);
    if (!userData.exists()) throw new Error("Faild to get new Data!");

    const existingWishList = userData.data().wishlist || [];
    const updatedWishList = existingWishList.includes(productID)
      ? existingWishList.filter((item: string) => item !== productID)
      : [...existingWishList, productID];

    await setDoc(docRef, { wishlist: updatedWishList }, { merge: true });

    const updatedUserData = await getDoc(docRef);
    if (updatedUserData.exists()) return updatedUserData.data();
    else throw new Error("Faild to Add to wishlist!");
  } catch (error) {
    if (error instanceof Error) throw new Error("Error Add to wishlist:");
    else throw new Error("Error Add to wishlist:");
  }
};

export const addToCart = async (product: { id: string; quantity: number }) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No user Auth");

    const docRef = doc(db, "users", user.uid);
    const userData = await getDoc(docRef);
    if (!userData.exists()) throw new Error("Faild to get new Data!");

    const existingCart = userData.data().cart || [];
    const existingProductIndex = existingCart.findIndex(
      (item: { id: string }) => item.id === product.id
    );

    if (existingProductIndex !== -1)
      existingCart[existingProductIndex].quantity += product.quantity;
    else existingCart.push(product);

    await setDoc(docRef, { cart: existingCart }, { merge: true });

    const updatedUserData = await getDoc(docRef);
    if (updatedUserData.exists()) return updatedUserData.data();
    else throw new Error("Faild get Uptaded Data!");
  } catch (error) {
    if (error instanceof Error) throw new Error("Error Add to wishlist:");
    else throw new Error("Error Add to wishlist:");
  }
};

export const getCart = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Authentication required");
  }
  try {
    const docRef = doc(db, "users", user.uid);
    const userData = await getDoc(docRef);
    if (!userData.exists()) throw new Error("Faild to get Doc from database");
    return userData.data().cart;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("Unknown error when try to get cart");
  }
};

export const updateCartQuantity = async (
  productId: string,
  quantity: number
) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No user is Auth!");

    const docRef = doc(db, "users", user.uid);
    const userData = await getDoc(docRef);
    if (!userData.exists()) throw new Error("Failed to get user data!");

    const existingCart = userData.data().cart || [];
    const updatedCart = existingCart.map(
      (item: { id: string; quantity: number }) =>
        item.id === productId ? { ...item, quantity } : item
    );

    await updateDoc(docRef, { cart: updatedCart });

    const newUserData = await getDoc(docRef);
    if (!newUserData.exists())
      throw new Error("Faild to get Doc from database");
    return newUserData.data();
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("An unknown error occurred");
  }
};

export const removeCartItemById = async (itemID: string) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Authentication required");
  }

  try {
    const docRef = doc(db, "users", user.uid);

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("User document not found");
    }

    const cart = docSnap.data().cart || [];

    const updatedCart = cart.filter(
      (item: { id: string }) => item.id !== itemID
    );

    await setDoc(
      docRef,
      {
        cart: updatedCart,
      },
      { merge: true }
    );
    const userData = await getDoc(docRef);
    if (!userData.exists()) throw new Error("Faild to get Doc from database");
    return userData.data().cart;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw new Error("Failed to remove item from cart");
  }
};

export const editAddress = async (updatedAddress: addressType) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No user Auth");

    const docRef = doc(db, "users", user.uid);
    const userData = await getDoc(docRef);
    if (!userData.exists()) throw new Error("Failed to get user data!");

    const updatedAddresses = userData
      .data()
      .address.map((address: addressType) =>
        address.id === updatedAddress.id ? updatedAddress : address
      );

    await setDoc(docRef, { address: updatedAddresses }, { merge: true });

    const updatedUserData = await getDoc(docRef);
    if (updatedUserData.exists()) return updatedUserData.data();
    else throw new Error("Failed to get updated data!");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("An unknown error occurred");
  }
};

export const newOrder = async (order: orderType) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Please Sign in to continue");

    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, {
      orders: arrayUnion({ ...order, Created_At: new Date().toISOString() }),
    });

    const data = await getDoc(docRef);

    if (!data.exists())
      throw new Error("No data in database found try again later!");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("Unknown error happen!");
  }
};

export const getOrder = async (orderID: number) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Authentication required");

    const orderRef = doc(db, "users", user.uid);
    const orderSnap = await getDoc(orderRef);

    if (!orderSnap.exists()) {
      throw new Error("Order not found");
    }

    const userDocument = orderSnap.data();

    if (userDocument.userID !== user.uid) {
      throw new Error("Unauthorized access");
    }
    if (!userDocument.orders) throw new Error("No orders in this account");

    const order = userDocument.orders.find(
      (order: orderType) => order.id === orderID
    );
    if (!order) throw new Error("No order with this id");

    return order;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Order fetch error: ${error.message}`);
      throw new Error("Failed to retrieve order");
    }
    throw new Error("Unknown error occurred");
  }
};

export const submitOrder = async (orderID: number) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Authentication required");

    const orderRef = doc(db, "users", user.uid);
    const orderSnap = await getDoc(orderRef);

    if (!orderSnap.exists()) {
      throw new Error("Order not found");
    }

    const userDocument = orderSnap.data();

    if (userDocument.userID !== user.uid) {
      throw new Error("Unauthorized access");
    }

    const updatedOrders = userDocument.orders.map((order: orderType) => {
      if (order.id === orderID) {
        return { ...order, status: "Submitted" };
      }
      return order;
    });

    await updateDoc(orderRef, {
      orders: updatedOrders,
      cart: [],
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Order fetch error: ${error.message}`);
      throw new Error("Failed to retrieve order");
    }
    throw new Error("Unknown error occurred");
  }
};

export const getOrders = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Authentication required");

    const orderRef = doc(db, "users", user.uid);
    const orderSnap = await getDoc(orderRef);

    if (!orderSnap.exists()) {
      throw new Error("Order not found");
    }

    const userDocument = orderSnap.data();

    if (userDocument.userID !== user.uid) {
      throw new Error("Unauthorized access");
    }

    return userDocument.orders;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Order fetch error: ${error.message}`);
      throw new Error("Failed to retrieve order");
    }
    throw new Error("Unknown error occurred");
  }
};
