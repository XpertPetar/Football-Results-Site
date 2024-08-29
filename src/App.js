import "./App.css";
import Matches from "./pages/Matches";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";
import Competitions from "./pages/Competitions";
import Competition from "./pages/Competition";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header>
                    <Routes>
                        <Route path="/matches" element={<Matches></Matches>}></Route>
                        <Route path="/" element={<Matches></Matches>}></Route>
                        <Route path="/competitions" element={<Competitions></Competitions>}></Route>
                        <Route
                            path="/competitions/:id"
                            element={<Competition></Competition>}
                        ></Route>
                    </Routes>
                </Header>
            </BrowserRouter>
        </div>
    );
}

export default App;
