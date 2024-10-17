import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import Header from "./components/Header/Header";
import Preview from "./components/Preview/Preview";
import Services from "./components/Services/Services";
import DoctorsMain from "./components/DoctorsMain/DoctorsMain";
import Departments from "./components/Departments/Departments";
import HelpMain from "./components/HelpMain/HelpMain";
import DynamicRoute from "./components/DynamicRoute/DynamicRoute";
import DoctorCard from "./components/DoctorCard/DoctorCard";
import "./App.css";
import DoctorDetail from "./components/DoctorDetail/DoctorDetail";
import Feedback from "./components/Feedback/Feedback";
import Footer from "./components/Footer/Footer";
import MoscowLogo from "./components/MoscowLogo/MoscowLogo";
import { doctors } from "./data/doctorsData";

function App() {
  return (
    <Router>
      <div className="app">
        <MoscowLogo />
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Preview />
                <Services />
                <DoctorsMain doctors={doctors} />
                <Departments />
                <HelpMain />
                <Feedback />
              </>
            }
          />
          <Route
            path="/our-doctors"
            element={
              <>
                <DoctorDetail id={1} /> <Feedback />
              </>
            }
          />
          <Route
            path="/doctor/:id"
            element={
              <>
                <DoctorDetail />
                <Feedback />
              </>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
