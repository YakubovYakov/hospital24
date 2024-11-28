import { useEffect, useState } from "react";
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
import OutOfTownPatients from "./components/OutOfTownPatients/OutOfTownPatients";
import PaidServices from "./components/PaidServices/PaidServices";
import AboutHospital from "./components/AboutHospital/AboutHospital";
import GeneralInformation from "./components/GeneralInformation/GeneralInformation";
import RegulatoryDocuments from "./components/InfoPage/RegulatoryDocuments/RegulatoryDocuments";
import Education from "./components/InfoPage/Education/Education";
import Vacancies from "./components/Vacancies/Vacancies";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu";

function App() {
  const location = useLocation();
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  useEffect(() => {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    const desktopOnlyRoutes = [
      // "/",
      // "/our-doctors",
      // "/departments",
      // "/contacts",
      "/about-hospital",
      // "/patient-info",
      // "/visitors",
      // "/paid-services",
      // "/out-of-town-patients",
    ];

    const isDesktopRoute =
      desktopOnlyRoutes.includes(location.pathname) // ||  Проверка для статических маршрутов
      // location.pathname.startsWith("/employers/") || 
      // location.pathname.startsWith("/departments/"); 
			
    if (isDesktopRoute) {
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
      <Header setIsBurgerMenuOpen={setIsBurgerMenuOpen} />
      <BurgerMenu
        isBurgerMenuOpen={isBurgerMenuOpen}
        setIsBurgerMenuOpen={setIsBurgerMenuOpen}
      />
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
          path="/employers/:id"
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
        <Route
          path="/out-of-town-patients"
          element={
            <>
              <DynamicRoute />
              <OutOfTownPatients />
            </>
          }
        />
        <Route
          path="/paid-services"
          element={
            <>
              <DynamicRoute />
              <PaidServices />
            </>
          }
        />
        <Route
          path="/about-hospital"
          element={
            <>
              <DynamicRoute />
              <AboutHospital />
            </>
          }
        />
        <Route
          path="/general-information"
          element={
            <>
              <DynamicRoute />
              <GeneralInformation />
            </>
          }
        />
        <Route
          path="/regulatory-documents"
          element={
            <>
              <DynamicRoute />
              <RegulatoryDocuments />
            </>
          }
        />
        <Route
          path="/education"
          element={
            <>
              <DynamicRoute />
              <Education />
            </>
          }
        />
        <Route
          path="/vacancies"
          element={
            <>
              <DynamicRoute />
              <Vacancies />
            </>
          }
        />
				<Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

// Обертка в BrowserRouter для корректной работы useLocation
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
