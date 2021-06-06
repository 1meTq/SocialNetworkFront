import './App.css';
import React from "react";
import Content from "./Components/Content/Content";
import {BrowserRouter} from "react-router-dom";
import {CookiesProvider} from "react-cookie";

function App(props) {
    return (
        <div>
            <CookiesProvider>
                <BrowserRouter>
                    <Content/>
                </BrowserRouter>
            </CookiesProvider>
        </div>
    );
}

export default App;
