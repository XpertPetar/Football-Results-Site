import { ref, set, remove, get } from "firebase/database";
import { db } from "../firebase/firebase";

export const addFavoriteTeam = async (userId, teamId) => {
    const reference = ref(db, `users/${userId}/favorite_team`);
    await set(reference, teamId);
};

export const removeFavoriteTeam = async (userId) => {
    const reference = ref(db, `users/${userId}/favorite_team`);
    await remove(reference);
};

export const getFavoriteTeam = async (userId) => {
    const reference = ref(db, `users/${userId}/favorite_team`);
    const snapshot = await get(reference);
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return {};
    }
};
