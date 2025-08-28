import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Testing from "./components/TestingApp/Testing.jsx"; // create this file
import OceanScene from "./components/Ocean/Ocean.jsx";
import Hero from "./components/Hero/Hero.jsx";
import OurSolutions from "./components/OurSolutions/OurSolutions.jsx";
import GridBackground from "./components/Testimonials/Grids.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<App />} />

        {/* /testing route */}
        <Route path="/testing" element={<Testing />} />

        <Route path="/Camera" element={
          <>
        {/* <Hero />

        <OceanScene /> */}
{/* <GridBackground/> */}
<OurSolutions/>

        </>} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);
