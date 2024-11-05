import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
	
} from "react-router-dom";
import { doctors } from "./data/doctorsData";
import "./App.css";

import MoscowLogo from "./components/MoscowLogo/MoscowLogo";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Страницы
import Main from "./components/Main/Main";
import DynamicRoute from "./components/DynamicRoute/DynamicRoute";
import DoctorDetail from "./components/Doctors/DoctorDetail/DoctorDetail";
import DoctorList from "./components/Doctors/DoctorList/DoctorList";
import DepartmentsList from "./components/Departments/DepartmentsList/DepartmentsList";
import Department from "./components/Departments/Department/Department";
import Contacts from "./components/Contacts/Contacts";
import PrivacyPolicy from "./components/InfoPage/PrivacyPolicy";
import VisitorInfo from "./components/VisitorInfo/VisitorInfo";
import PatientInfoPanel from "./components/PatientInfoPanel/PatientInfoPanel";

// Основная логика для маршрутизации и адаптации
function App() {
  const location = useLocation();

  useEffect(() => {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    const desktopOnlyRoutes = ["/patient-info", "/visitors"];

    // Изменение мета-тега в зависимости от маршрута
    if (desktopOnlyRoutes.includes(location.pathname)) {
      metaViewport.setAttribute("content", "width=1200, initial-scale=1");
    } else {
      metaViewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1"
      );
    }
  }, [location]);

  return (
    <div className="app">
      <MoscowLogo />
      <Header />
      <Routes>
        <Route path="/" element={<Main doctors={doctors} />} />
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
  );
}

// Обернем приложение в BrowserRouter для корректной работы useLocation
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
