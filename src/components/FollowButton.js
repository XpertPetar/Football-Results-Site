import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { addFavoriteTeam, removeFavoriteTeam } from "../services/databaseService";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { useFavorite } from "../contexts/favoriteTeamContext/favoriteTeamContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function FollowButton(props) {
    const [isClicked, setIsClicked] = useState(false);
    const { favoriteTeam } = useFavorite();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (props.id == favoriteTeam) {
            setIsClicked(true);
        } else {
            setIsClicked(false);
        }
    }, [favoriteTeam, props.id]);

    const handleClick = async () => {
        try {
            const userId = auth.currentUser.uid;

            if (!isClicked) {
                try {
                    await addFavoriteTeam(userId, props.id);
                } catch (error) {
                    console.error("Error adding to favorites: ", error);
                }
            } else {
                try {
                    await removeFavoriteTeam(userId);
                } catch (error) {
                    console.error("Error removing from favorites: ", error);
                }
            }

            setIsClicked(!isClicked);
        } catch (error) {
            console.log(error);
            alert("You are not logged in! \nRedirecting to login page.");
            navigate("/login", { state: { previousUrl: location.pathname } });
        }
    };

    return (
        <button
            onClick={handleClick}
            className="inline-flex items-center cursor-pointer h-fit text-white bg-gradient-to-br from-blue-900 to-blue-400 hover:bg-gradient-to-bl font-medium rounded-md text-sm px-5 py-2.5 text-center w-32"
        >
            {isClicked ? (
                <>
                    <HeartIconSolid
                        title="Remove from Favorites"
                        className={`size-5 text-red-600 hover:opacity-70`}
                        stroke="white"
                    ></HeartIconSolid>
                    <span className="pl-2.5">Unfollow</span>
                </>
            ) : (
                <>
                    <HeartIconOutline
                        title="Add to Favorites"
                        className={`size-5 hover:text-red-600`}
                    ></HeartIconOutline>
                    <span className="pl-2.5">Follow</span>
                </>
            )}
        </button>
    );
}
