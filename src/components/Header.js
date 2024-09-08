import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { auth } from "../firebase/firebase";
import { doSignOut } from "../firebase/auth";
import Search from "./Search";
import { useFavorite } from "../contexts/favoriteTeamContext/favoriteTeamContext";
import { teamsDictionary } from "../Global";

const navigation = [
    { name: "Matches", href: "/matches" },
    { name: "Competitions", href: "/competitions" },
    { name: "News", href: "/news" }
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Header(props) {
    const { userLoggedIn, currentUser } = useAuth();
    const { favoriteTeam } = useFavorite();
    const favoriteTeamKey = Object.keys(favoriteTeam);

    const userId = auth.currentUser?.uid;

    console.log("favritue tena: ", favoriteTeamKey);
    console.log("user tena: ", userId);

    function getFavoriteTeamName() {
        return Object.keys(teamsDictionary).find((key) => teamsDictionary[key] == favoriteTeam);
    }

    return (
        <div className="noto-sans-regular">
            <Disclosure
                as="nav"
                className="text-white bg-gradient-to-br from-blue-900 to-blue-400 font-medium text-sm px-5 py-2.5 text-center mb-2"
            >
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon
                                    aria-hidden="true"
                                    className="block h-6 w-6 group-data-[open]:hidden"
                                />
                                <XMarkIcon
                                    aria-hidden="true"
                                    className="hidden h-6 w-6 group-data-[open]:block"
                                />
                            </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            to={item.href}
                                            className={({ isActive }) => {
                                                return (
                                                    "no-underline rounded-md px-3 py-2 text-sm font-medium " +
                                                    (isActive
                                                        ? "bg-blue-900 text-white"
                                                        : "text-gray-100 hover:bg-blue-400 hover:text-white")
                                                );
                                            }}
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}

                                    {/* favorite team link */}
                                    {userLoggedIn && favoriteTeamKey.length > 0 ? (
                                        <NavLink
                                            to={`/team/${favoriteTeam}`}
                                            className={({ isActive }) => {
                                                return (
                                                    "no-underline rounded-md px-3 py-2 text-sm font-medium " +
                                                    (isActive
                                                        ? "bg-blue-900 text-white"
                                                        : "text-gray-100 hover:bg-blue-400 hover:text-white")
                                                );
                                            }}
                                        >
                                            {getFavoriteTeamName()}
                                        </NavLink>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Search />
                        </div>
                        <div className="hidden lg:block absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {userLoggedIn ? (
                                <NavLink
                                    to={"/login"}
                                    onClick={() => {
                                        doSignOut();
                                    }}
                                    className={({ isActive }) => {
                                        return (
                                            "no-underline rounded-md px-3 py-2 text-sm font-medium " +
                                            (isActive
                                                ? "bg-blue-900 text-white"
                                                : "text-gray-100 hover:bg-blue-400 hover:text-white")
                                        );
                                    }}
                                >
                                    Logout
                                </NavLink>
                            ) : (
                                <NavLink
                                    to={"/login"}
                                    className={({ isActive }) => {
                                        return (
                                            "no-underline rounded-md px-3 py-2 text-sm font-medium " +
                                            (isActive
                                                ? "bg-blue-900 text-white"
                                                : "text-gray-100 hover:bg-blue-400 hover:text-white")
                                        );
                                    }}
                                >
                                    Login
                                </NavLink>
                            )}
                        </div>
                    </div>
                </div>

                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                as="a"
                                to={item.href}
                                className={({ isActive }) => {
                                    return (
                                        "no-underline block rounded-md px-3 py-2 text-base font-medium text-left " +
                                        (isActive
                                            ? "bg-blue-900 text-white"
                                            : "text-gray-300 hover:bg-blue-400 hover:text-white")
                                    );
                                }}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                        {/* favorite team link */}
                        {userLoggedIn && favoriteTeamKey.length > 0 ? (
                            <NavLink
                                to={`/team/${favoriteTeam}`}
                                className={({ isActive }) => {
                                    return (
                                        "no-underline block rounded-md px-3 py-2 text-base font-medium text-left " +
                                        (isActive
                                            ? "bg-blue-900 text-white"
                                            : "text-gray-300 hover:bg-blue-400 hover:text-white")
                                    );
                                }}
                            >
                                {getFavoriteTeamName()}
                            </NavLink>
                        ) : null}

                        {userLoggedIn ? (
                            <NavLink
                                to={"/login"}
                                onClick={() => {
                                    doSignOut();
                                }}
                                className={({ isActive }) => {
                                    return (
                                        "no-underline block rounded-md px-3 py-2 text-base font-medium text-left " +
                                        (isActive
                                            ? "bg-blue-900 text-white"
                                            : "text-gray-300 hover:bg-blue-400 hover:text-white")
                                    );
                                }}
                            >
                                Logout
                            </NavLink>
                        ) : (
                            <NavLink
                                to={"/login"}
                                className={({ isActive }) => {
                                    return (
                                        "no-underline block rounded-md px-3 py-2 text-base font-medium text-left " +
                                        (isActive
                                            ? "bg-blue-900 text-white"
                                            : "text-gray-300 hover:bg-blue-400 hover:text-white")
                                    );
                                }}
                            >
                                Login
                            </NavLink>
                        )}
                    </div>
                </DisclosurePanel>
            </Disclosure>
            <div className="bg-[url('./images/background-2.png')] bg-center h-screen object-cover bg-no-repeat">
                <div className="my-3 p-2 max-w-6xl mx-auto">{props.children}</div>
            </div>
        </div>
    );
}
