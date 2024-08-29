import "./App.css";
import Matches from "./pages/Matches";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";
import Competitions from "./pages/Competitions";
import Competition from "./pages/Competition";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/authContext";
import Register from "./pages/Register";
import Team from "./pages/Team";

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <BrowserRouter>
                    <Header>
                        <Routes>
                            <Route path="/matches" element={<Matches></Matches>}></Route>
                            <Route path="/" element={<Matches></Matches>}></Route>
                            <Route
                                path="/competitions"
                                element={<Competitions></Competitions>}
                            ></Route>
                            <Route
                                path="/competitions/:id"
                                element={<Competition></Competition>}
                            ></Route>
                            <Route path="/login" element={<Login></Login>}></Route>
                            <Route path="/register" element={<Register></Register>}></Route>
                            <Route path="/team/:id" element={<Team></Team>}></Route>
                        </Routes>
                    </Header>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;
