import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'; // Import the initialized auth instance from firebase.ts

/**
 * Logs in a user using email and password.
 * @param email - The user's email address
 * @param password - The user's password
 * @returns Promise<void>
 */
export const loginUser = async (email: string, password: string): Promise<void> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User signed in:", user);
        // You could add additional logic here, such as redirecting the user or storing user data
    } catch (error: any) {
        console.error("Error during login:", error.code, error.message);
        throw error; // Re-throw the error so it can be handled in the calling function
    }
};
