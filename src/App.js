import "./App.css";
import Matches from "./pages/Matches";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header>
                    <Routes>
                        <Route path="/matches" element={<Matches></Matches>}></Route>
                        <Route path="/" element={<Matches></Matches>}></Route>
                    </Routes>
                </Header>
            </BrowserRouter>
        </div>
    );
}

export default App;
