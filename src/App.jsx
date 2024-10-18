import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { doctors } from "./data/doctorsData";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import MoscowLogo from "./components/MoscowLogo/MoscowLogo";
import Header from "./components/Header/Header";
// --- Главная
import Preview from "./components/Preview/Preview";
import Services from "./components/Services/Services";
import DoctorsMain from "./components/DoctorsMain/DoctorsMain";
import DepartmentsMain from "./components/DepartmentsMain/DepartmentsMain";
import HelpMain from "./components/HelpMain/HelpMain";
import Feedback from "./components/Feedback/Feedback";
// ---
import DynamicRoute from "./components/DynamicRoute/DynamicRoute";
// --- Доктор
import DoctorCard from "./components/DoctorCard/DoctorCard";
import DoctorDetail from "./components/DoctorDetail/DoctorDetail";
import DoctorList from "./components/DoctorList/DoctorList";
// --- Отделение
import DepartmentsList from "./components/DepartmentsList/DepartmentsList";
import Department from "./components/Department/Department";
import Footer from "./components/Footer/Footer";
import { departments } from "./data/departmentsData";

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
                <DepartmentsMain />
                <HelpMain />
                <Feedback />
              </>
            }
          />
          <Route
            path="/our-doctors"
            element={
              <>
                <DynamicRoute />
                <DoctorList />
              </>
            }
          />
          <Route
            path="/doctor/:id"
            element={
              <>
                <DynamicRoute />
                <DoctorDetail />
              </>
            }
          />
          <Route
            path="/departments"
            element={
              <>
                <DynamicRoute />
                <DepartmentsList />
              </>
            }
          />
          <Route
            path="/departments/:id"
            element={
              <>
                <DynamicRoute />
                <Department />
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
