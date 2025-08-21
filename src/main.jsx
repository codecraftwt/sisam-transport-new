import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Testing from "./components/TestingApp/Testing.jsx"; // create this file

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<App />} />

        {/* /testing route */}
        <Route path="/testing" element={<Testing />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
