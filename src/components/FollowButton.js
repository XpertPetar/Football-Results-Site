import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { addFavoriteTeam, removeFavoriteTeam } from "../services/databaseService";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { useFavorite } from "../contexts/favoriteTeamContext/favoriteTeamContext";

export default function FollowButton(props) {
    const [isClicked, setIsClicked] = useState(false);
    const { favoriteTeam } = useFavorite();

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
                    //updateMessage("Added to favorites");
                } catch (error) {
                    console.error("Error adding to favorites: ", error);
                    //updateMessage("An error occured, try again");
                }
            } else {
                try {
                    await removeFavoriteTeam(userId);
                    //updateMessage("Removed from favorites");
                } catch (error) {
                    //updateMessage("An error occured, try again");
                    console.error("Error removing from favorites: ", error);
                }
            }

            setIsClicked(!isClicked);
        } catch (error) {
            // alert("You're not logged in!");
            //updateMessage("You need to log in to add to your favorites");
            //sessionStorage.setItem("previousUrl", window.location.pathname);
            console.log(error);
        }
    };

    return (
        <button
            onClick={handleClick}
            className="inline-flex items-center cursor-pointer h-fit text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-md text-sm px-5 py-2.5 text-center w-32"
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
