import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebaseConfig"; // Import Firestore instance
import { Meditation } from "../types/Meditation";
import { User } from "../types/User";

// Function to get meditations by category
export const getMeditations = async (category: string) => {
    try {
        
        const q = query(collection(db, "meditations"), where("category", "==", category));
        const querySnapshot = await getDocs(q);
        const meditations = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data() as Meditation,
        }));

        const currentUser = auth.currentUser;

        if (!currentUser || !currentUser.email) {
            throw new Error("No authenticated user or email not found.");
        }

        const userEmail = currentUser.email;
        
        const userPreference = query(collection(db, "dummy"), where("Email", "==", userEmail));
        const userSnapshot = await getDocs(userPreference);
        const user = userSnapshot.docs[0].data() as User;

        const familiarityOrder = (() => {
            switch (user.familiarity) {
                case "Beginner":
                    return ["Introductory", "Moderate", "Well-versed"];
                case "Casual":
                    return ["Moderate", "Well-versed", "Introductory"];
                case "Regular":
                    return ["Well-versed", "Moderate", "Introductory"];
            }
        })();

        const sortedMeditations = meditations.sort((a, b) => {
            const timeChoiceOrder = [user.time_choice_one, user.time_choice_two, user.time_choice_three];
            const timeA = timeChoiceOrder.indexOf(a.duration);
            const timeB = timeChoiceOrder.indexOf(b.duration);

            if (timeA !== timeB) return timeA - timeB; 

            const familiarityA = familiarityOrder.indexOf(a.familiarity);
            const familiarityB = familiarityOrder.indexOf(b.familiarity);

            return familiarityA - familiarityB; // Sort by familiarity
        });

        console.log("Sorted Meditations:", sortedMeditations);
        return sortedMeditations;

    } catch (error) {
        console.error("Error getting meditations: ", error);
        throw error;
    }
};


export const getUserInfo = async () => {
    try {

        const currentUser = auth.currentUser;

        if (!currentUser || !currentUser.email) {
            throw new Error("No authenticated user or email not found.");
        }

        const userEmail = currentUser.email;
        
        const userPreference = query(collection(db, "dummy"), where("Email", "==", userEmail));
        const userSnapshot = await getDocs(userPreference);
        const user = userSnapshot.docs[0].data() as User;
        
        return user;

    } catch (error) {
        console.error("Error getting user info: ", error);
        throw error;
    }
};
