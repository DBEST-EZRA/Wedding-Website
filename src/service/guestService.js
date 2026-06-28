import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "./firebase";

const guestsRef = collection(db, "wedding");

// Add Guest
export const addGuest = async (guest) => {
  try {
    const docRef = await addDoc(guestsRef, guest);
    return docRef.id;
  } catch (error) {
    console.error("Error adding guest:", error);
    throw error;
  }
};

// Get All Guests
export const getGuests = async () => {
  try {
    const q = query(guestsRef, orderBy("name"));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching guests:", error);
    throw error;
  }
};

// Get Guest by ID
export const getGuestById = async (id) => {
  try {
    const guestRef = doc(db, "wedding", id);
    const snapshot = await getDoc(guestRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  } catch (error) {
    console.error("Error fetching guest:", error);
    throw error;
  }
};

// Update Guest
export const updateGuest = async (id, data) => {
  try {
    const guestRef = doc(db, "wedding", id);

    await updateDoc(guestRef, data);

    return true;
  } catch (error) {
    console.error("Error updating guest:", error);
    throw error;
  }
};

// Delete Guest
export const deleteGuest = async (id) => {
  try {
    const guestRef = doc(db, "wedding", id);

    await deleteDoc(guestRef);

    return true;
  } catch (error) {
    console.error("Error deleting guest:", error);
    throw error;
  }
};
