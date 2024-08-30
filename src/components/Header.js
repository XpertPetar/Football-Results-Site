import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import Search from "./Search";

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

    return (
        <>
            <Disclosure
                as="nav"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 font-medium text-sm px-5 py-2.5 text-center mb-2"
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
                                                        ? "bg-purple-800 text-white"
                                                        : "text-gray-100 hover:bg-purple-500 hover:text-white")
                                                );
                                            }}
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Search />
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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
                                                ? "bg-purple-800 text-white"
                                                : "text-gray-100 hover:bg-purple-500 hover:text-white")
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
                                                ? "bg-purple-800 text-white"
                                                : "text-gray-100 hover:bg-purple-500 hover:text-white")
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
                                            ? "bg-purple-800 text-white"
                                            : "text-gray-300 hover:bg-purple-800 hover:text-white")
                                    );
                                }}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                </DisclosurePanel>
            </Disclosure>
            <div className="bg-white">
                <div className="my-3 p-2 max-w-6xl mx-auto">{props.children}</div>
            </div>
        </>
    );
}
