import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { doctors } from "./data/doctorsData";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import MoscowLogo from "./components/MoscowLogo/MoscowLogo";
import Header from "./components/Header/Header";
// --- Главная
import Main from "./components/Main/Main";

// ---
import DynamicRoute from "./components/DynamicRoute/DynamicRoute";
// --- Доктор
import DoctorCard from "./components/Doctors/DoctorCard/DoctorCard";
import DoctorDetail from "./components/Doctors/DoctorDetail/DoctorDetail";
import DoctorList from "./components/Doctors/DoctorList/DoctorList";
// --- Отделение
import DepartmentsList from "./components/Departments/DepartmentsList/DepartmentsList";
import Department from "./components/Departments/Department/Department";
import Footer from "./components/Footer/Footer";
// --- Информационные страницы
import Contacts from "./components/Contacts/Contacts";
import PrivacyPolicy from "./components/InfoPage/PrivacyPolicy.jsx";
import VisitorInfo from "./components/VisitorInfo/VisitorInfo";
import PatientInfoPanel from "./components/PatientInfoPanel/PatientInfoPanel";

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
                <Main doctors={doctors} />
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
          <Route
            path="/visitors"
            element={
              <>
                <DynamicRoute />
                <VisitorInfo />
              </>
            }
          />
          <Route
            path="/patient-info"
            element={
              <>
                <DynamicRoute />
                <PatientInfoPanel />
              </>
            }
          />
          <Route
            path="/contacts"
            element={
              <>
                <DynamicRoute />
                <Contacts />
              </>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <>
                <DynamicRoute />
                <PrivacyPolicy />
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
