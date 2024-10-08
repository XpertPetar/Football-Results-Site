import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { Navigate } from "react-router-dom";
import GoogleSignIn from "../components/GoogleSignIn";

export default function Register() {
    const { userLoggedIn } = useAuth();
    const [isRegistering, setIsRegistering] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
                setIsRegistering(false);
            } catch (error) {
                setIsRegistering(false);
            }
        }
    };

    return (
        <div className="w-fit mx-auto mt-36">
            {userLoggedIn ? (
                <Navigate to={"/"} replace={true} />
            ) : (
                <div className="border-2 border-slate-400 bg-slate-200 p-12 rounded-lg">
                    <form onSubmit={onSubmit}>
                        <h3 className="font-bold text-lg">Register</h3>

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
                                Register
                            </button>
                        </div>
                    </form>
                    <GoogleSignIn></GoogleSignIn>
                </div>
            )}
        </div>
    );
}
