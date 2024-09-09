import React, { createContext, useState, useContext, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { db } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase";

const FavoriteTeamContext = createContext();

export const FavoriteTeamProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [favoriteTeam, setFavoriteTeam] = useState({});

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (userId) {
            const teamRef = ref(db, `users/${userId}/favorite_team`);

            const handleTeamChange = (snapshot) => {
                if (snapshot.exists()) {
                    setFavoriteTeam(snapshot.val());
                } else {
                    setFavoriteTeam({});
                }
            };

            onValue(teamRef, handleTeamChange);

            return () => {
                off(teamRef, "value", handleTeamChange);
            };
        } else {
            setFavoriteTeam({});
        }
    }, [userId]);

    return (
        <FavoriteTeamContext.Provider value={{ favoriteTeam }}>
            {children}
        </FavoriteTeamContext.Provider>
    );
};

export const useFavorite = () => useContext(FavoriteTeamContext);
