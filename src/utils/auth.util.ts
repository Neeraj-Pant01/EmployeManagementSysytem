import { FDB } from "../config/firebase.ts" 
import { ref, set, get, update, remove, child, push } from "firebase/database";

// Define User Type
interface User {
  id: string; 
  email: string;
  password: string;
  isAdmin:boolean,
  displayName?: string,
  mobile?:string
}

interface LoginCredentials {
    email: string;
    password: string;
  }

// ** Sign Up (Create User) **
export const signupUSer = async ({ email, password, displayName, mobile }: User) => {
  try {
    // Reference to the users list
    const usersRef = ref(FDB, "users");
    const newUserRef = push(usersRef);
    await set(newUserRef, {
      id: newUserRef.key,
      email,
      password,
      isAdmin: false,
      displayName,
      mobile,
    });

    return { id: newUserRef.key, email, displayName };
  } catch (error) {
    console.error("Signup Error: ", error);
    throw error;
  }
};

// ** Login (Retrieve User) **
export const loginUser = async ({ email, password }: LoginCredentials) => {
  try {
    const usersRef = ref(FDB, "users");
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const users = snapshot.val();
      for (const userId in users) {
        if (users[userId].email === email && users[userId].password === password) {
          // Include the userId in the returned user object
          return { id: userId, ...users[userId] };
        }
      }
    }
    throw new Error("Invalid email or password");
  } catch (error) {
    console.error("Login Error: ", error);
    throw error;
  }
};

// ** Update User **
export const updateUser = async (id: string, newData: Partial<Omit<User, "id">>) => {
  try {
    const userRef = ref(FDB, `users/${id}`);

    await update(userRef, newData);

    return { id, ...newData };
  } catch (error) {
    console.error("Update User Error: ", error);
    throw error;
  }
};

// ** Delete User **
export const deleteUserAccount = async (id: string) => {
  try {
    const userRef = ref(FDB, `users/${id}`);
    await remove(userRef);
    console.log("User deleted successfully!");
  } catch (error) {
    console.error("Delete User Error: ", error);
    throw error;
  }
};


export const createNewUser = async (adminId: string, newUser: User) => {
  try {
    // Reference to the admin user
    const adminRef = ref(FDB, `users/${adminId}`);
    const adminSnapshot = await get(adminRef);

    if (!adminSnapshot.exists() || !adminSnapshot.val().isAdmin) {
      throw new Error("Unauthorized: Only admins can create new users.");
    }

    // Reference to the users list
    const usersRef = ref(FDB, "users");

    // Generate a unique ID for the new user using Firebase's push() method
    const newUserRef = push(usersRef);

    // Add the new user with the auto-generated ID
    await set(newUserRef, {
      ...newUser,
      isAdmin: newUser.isAdmin || false, // Default to non-admin if not specified
    });

    return { success: true, message: "User created successfully.", userId: newUserRef.key };
  } catch (error) {
    console.error("Create User Error: ", error);
    throw error;
  }
};


export const getAllUsersExceptCurrent = async (currentUserId: string) => {
  try {
    const usersRef = ref(FDB, "users");
    const snapshot = await get(usersRef);

    if (!snapshot.exists()) {
      return [];
    }

    const users = snapshot.val();
    const filteredUsers = Object.keys(users)
      .filter((userId) => userId !== currentUserId) // Exclude current user
      .map((userId) => ({ id: userId, ...users[userId] }));

    return filteredUsers;
  } catch (error) {
    console.error("Get Users Error: ", error);
    throw error;
  }
};
