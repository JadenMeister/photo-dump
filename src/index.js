import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.createRoot = function (elementById) {
    return undefined;
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

reportWebVitals();
