import React, { useEffect, useState } from "react";
import "./DynamicRoute.css";
import { useParams, Link, useLocation } from "react-router-dom";
import { doctors } from "../../data/doctorsData";
import { departments } from "../../data/departmentsData";
import { fetchDepartmentsById, fetchDoctorById } from "../../utils/api";

function DynamicRoute() {
  const { id } = useParams();
  const location = useLocation();

  const isDoctorPage = location.pathname.includes("/employers");
  const isOurDoctorsPage = location.pathname === "/our-doctors";
  const isDepartmentsPage = location.pathname === "/departments";
  const isDepartmentPage = /^\/departments\/\d+$/.test(location.pathname);
  const isPrivacyPolicyPage = location.pathname.includes("/privacy-policy");
  const isContactsPage = location.pathname.includes("/contacts");
  const isVisitorPage = location.pathname.includes("/visitors");
  const isPatientInfoPage = location.pathname.includes("/patient-info");
  const isOutOfTownPatientsPage = location.pathname.includes(
    "/out-of-town-patients"
  );
  const isPaidServicesPage = location.pathname.includes("/paid-services");

  const [doctorName, setDoctorName] = useState("");
  const [departmentName, setDepartmentName] = useState("");

  const doctor = isDoctorPage
    ? doctors.find((doc) => doc.id === parseInt(id, 10))
    : null;
  const department =
    isDepartmentPage && id
      ? departments.find((dept) => dept.id === parseInt(id, 10))
      : null;

  useEffect(() => {
   

    if (id) {
      if (isDoctorPage) {
        fetchDoctorById(id)
          .then((data) => {
            if (data && data.full_name) {
              setDoctorName(data.full_name);
            }
          })
          .catch((error) => console.error("Ошибка при загрузке врача:", error));
      } else if (isDepartmentPage) {
        fetchDepartmentsById(id)
          .then((data) => {
            if (data && data.name) {
              setDepartmentName(data.name);
            }
          })
          .catch((error) =>
            console.error("Ошибка при загрузке отделения:", error)
          );
      }
    }
  }, [id, isDoctorPage, isDepartmentPage]);

  return (
    <section className="dynamic-route">
      <div className="dynamic-route__container">
        <Link className="dynamic-route__link-home" to="/">
          Главная
        </Link>

        {isOurDoctorsPage && (
          <>
            <Link className="dynamic-route__link" to="/our-doctors">
              Наши врачи
            </Link>
          </>
        )}

        {isDoctorPage && (
          <>
            <Link
              className="dynamic-route__link doctors-route"
              to="/our-doctors"
            >
              Наши врачи
            </Link>

            <span className="dynamic-route__current">{doctorName}</span>
          </>
        )}

        {isDepartmentsPage && (
          <>
            <Link className="dynamic-route__link" to="/departments">
              Отделения
            </Link>
          </>
        )}

        {isDepartmentPage && (
          <>
            <Link className="dynamic-route__link" to="/departments">
              Отделения
            </Link>
            <span className="dynamic-route__arrow"></span>
            <span className="dynamic-route__current-dept">
              {departmentName}
            </span>
          </>
        )}

        {isPrivacyPolicyPage && (
          <>
            <Link
              className="dynamic-route__link-privacy-policy"
              to="/privacy-policy"
            >
              Политика обработки персональных данных
            </Link>
          </>
        )}

        {isContactsPage && (
          <>
            <Link className="dynamic-route__link-privacy-policy" to="/contacts">
              Контакты
            </Link>
          </>
        )}
        {isVisitorPage && (
          <>
            <Link className="dynamic-route__link-privacy-policy" to="/visitors">
              Если Ваш близкий находится у нас
            </Link>
          </>
        )}
        {isPatientInfoPage && (
          <>
            <Link
              className="dynamic-route__link-privacy-policy"
              to="/patient-info"
            >
              Записаться по направлению
            </Link>
          </>
        )}
        {isOutOfTownPatientsPage && (
          <>
            <Link
              className="dynamic-route__link-privacy-policy"
              to="/out-of-town-patients"
            >
              Иногородним пациентам
            </Link>
          </>
        )}
        {isPaidServicesPage && (
          <>
            <Link
              className="dynamic-route__link-privacy-policy"
              to="/paid-services"
            >
              Платные услуги
            </Link>
          </>
        )}
      </div>
    </section>
  );
}

export default DynamicRoute;
