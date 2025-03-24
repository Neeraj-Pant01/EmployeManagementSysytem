import { FDB } from "../config/firebase.ts";
import { ref, set, get, update, remove, push } from "firebase/database";

interface Booking {
  userId: string;
  userName: string;
  bookName: string;
  SPN_NO: string;
  author: string;
  dateOfIssue: string;
  price: string;
}

// const currentUser = JSON.parse(localStorage.getItem("adminUser") || "{}");

export const createBooking = async (booking: Booking) => {
  try {
    const bookingsRef = ref(FDB, "bookings"); // Reference to the bookings collection
    const newBookingRef = push(bookingsRef); // Generate a unique Firebase key

    // Save the booking data to Firebase
    await set(newBookingRef, booking);

    return { success: true, message: "Booking added successfully!", bookingId: newBookingRef.key };
  } catch (error) {
    console.error("Create Booking Error:", error);
    throw error;
  }
};

export const getAllBookings = async (currentUser) => {
  try {
    const bookingsRef = ref(FDB, "bookings");
    const snapshot = await get(bookingsRef);

    if (snapshot.exists()) {
      const bookings: (Booking & { id: string })[] = [];

      snapshot.forEach((childSnapshot) => {
        const booking = childSnapshot.val();
        booking.id = childSnapshot.key; // Add the auto-generated key as the ID

        // Debug logs
        // console.log("Current User:", currentUser);
        // console.log("Booking:", booking);

        // Check if the user is an admin
        if (currentUser.isAdmin === true) {
          // console.log("User is an admin, showing all bookings.");
          bookings.push(booking); // If admin, show all bookings
        } else {
          // console.log("User is not an admin, filtering bookings.");

          // Check if the booking belongs to the user
          const isUserBooking =
            booking.userId === currentUser.id || // Check userId first
            booking.userName === currentUser.displayName; // Fallback to userName

          if (isUserBooking) {
            // console.log("Booking belongs to the user, adding to list.");
            bookings.push(booking);
          } else {
            // console.log("Booking does not belong to the user, skipping.");
          }
        }
      });

      // Debug log for filtered bookings
      console.log("Filtered Bookings:", bookings);
      return bookings;
    } else {
      console.log("No bookings found.");
      return [];
    }
  } catch (error) {
    console.error("Get All Bookings Error:", error);
    throw error;
  }
};

export const updateBooking = async (bookingId: string, newData: Partial<Booking>) => {
  try {
    const bookingRef = ref(FDB, `bookings/${bookingId}`);

    await update(bookingRef, newData);

    return { success: true, message: "Booking updated successfully!", bookingId };
  } catch (error) {
    console.error("Update Booking Error: ", error);
    throw error;
  }
};

export const deleteBooking = async (bookingId: string) => {
  try {
    const bookingRef = ref(FDB, `bookings/${bookingId}`);
    await remove(bookingRef);

    return { success: true, message: "Booking deleted successfully!" };
  } catch (error) {
    console.error("Delete Booking Error: ", error);
    throw error;
  }
};