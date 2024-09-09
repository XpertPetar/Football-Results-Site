import { useEffect, useState } from "react";
import { doSignInWithEmailAndPassword } from "../firebase/auth.js";
import { useAuth } from "../contexts/authContext";
import { Navigate, Link, useLocation } from "react-router-dom";
import GoogleSignIn from "../components/GoogleSignIn.js";

export default function Login() {
    const { userLoggedIn } = useAuth();
    const location = useLocation();
    const prevUrl = location.state?.previousUrl || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSigningIn, setSigningIn] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
            } catch (err) {
                setError("Incorrect username or password.");
                setSigningIn(false);
            }
        }
    };

    useEffect(() => {
        if (email === "" || password === "") {
            setError("");
        }
    }, [email, password]);

    return (
        <div className="w-fit mx-auto mt-36">
            {userLoggedIn ? (
                <Navigate to={prevUrl} replace={true} />
            ) : (
                <>
                    {error && (
                        <div className="mb-2 bg-red-700 bg-opacity-60 mx-auto text-center p-2.5 rounded-lg border-1 border-red-900 text-sm text-white">
                            {error}
                        </div>
                    )}
                    <div className="border-2 border-slate-400 bg-slate-200 bg-opacity-60 p-12 rounded-lg">
                        <form onSubmit={onSubmit}>
                            <h3 className="font-bold text-lg">Login</h3>

                            <div className="flex justify-between items-center mt-6 mb-2 pb-2">
                                <label htmlFor="email" className="mr-2 text-sm">
                                    Email:
                                </label>
                                <input
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    id="email"
                                    placeholder="name.surname@gmail.com"
                                    value={email}
                                    className="h-10 rounded min-w-[210px] px-2 bg-slate-50 text-sm"
                                ></input>
                            </div>
                            <div className="flex justify-between items-center pb-3">
                                <label htmlFor="password" className="mr-2 text-sm">
                                    Password:
                                </label>
                                <input
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    id="password"
                                    type="password"
                                    placeholder="&middot; &middot; &middot; &middot; &middot; &middot; &middot; &middot; &middot; &middot;"
                                    value={password}
                                    className="h-10 rounded min-w-[210px] px-2 bg-slate-50 text-sm"
                                ></input>
                            </div>
                            <div className="border-t border-slate-400">
                                <button className="mt-4 mb-2 text-white bg-blue-900 hover:bg-blue-400 rounded-lg text-sm w-full py-2.5 px-4 text-center items-center dark:focus:ring-[#050708]/50 me-2 mb-2 font-bold">
                                    Login
                                </button>
                            </div>
                        </form>
                        <GoogleSignIn></GoogleSignIn>
                        <div className="mt-3 text-xs text-center">
                            <span className="">Don't have an account? </span>
                            <Link
                                to={"/register"}
                                className="underline text-blue-500 hover:text-blue-700"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
