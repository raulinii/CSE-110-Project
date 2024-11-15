import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import Firestore instance

// Function to get meditations by category
export const getMeditations = async (category: string) => {
    try {
        const q = query(collection(db, "meditations"), where("category", "==", category));
        const querySnapshot = await getDocs(q);

        // Map Firestore documents to a usable format
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error getting meditations: ", error);
        throw error;
    }
};
