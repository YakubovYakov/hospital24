import React, { useEffect, useState } from "react";
import "./DynamicRoute.css";
import { useParams, Link, useLocation } from "react-router-dom";
import { doctors } from "../../data/doctorsData";
import { departments } from "../../data/departmentsData";
import { fetchDoctorById } from "../../utils/api";

function DynamicRoute() {
  const { id } = useParams();
  const location = useLocation();

  const isDoctorPage = location.pathname.includes("/doctor");
  const isOurDoctorsPage = location.pathname === "/our-doctors";
  const isDepartmentPage = location.pathname.includes("/departments");
  const isPrivacyPolicyPage = location.pathname.includes("/privacy-policy");
  const isContactsPage = location.pathname.includes("/contacts");
  const isVisitorPage = location.pathname.includes("/visitors");
	const isPatientInfoPage = location.pathname.includes("/patient-info")

  const [doctorName, setDoctorName] = useState("");

  const doctor = isDoctorPage
    ? doctors.find((doc) => doc.id === parseInt(id, 10))
    : null;
  const department =
    isDepartmentPage && id
      ? departments.find((dept) => dept.id === parseInt(id, 10))
      : null;

  useEffect(() => {
    if (isDoctorPage && id) {
      fetchDoctorById(id)
        .then((data) => {
          if (data && data.full_name) {
            setDoctorName(data.full_name);
          }
        })
        .catch((error) => console.error("Ошибка при загрузке врача:", error));
    }
  }, [isDoctorPage, id]);

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
            <Link className="dynamic-route__link" to="/our-doctors">
              Наши врачи
            </Link>

            <span className="dynamic-route__current">{doctorName}</span>
          </>
        )}

        {isDepartmentPage && (
          <>
            <Link className="dynamic-route__link-departments" to="/departments">
              Отделения
            </Link>
            {department && (
              <p className="dynamic-route__current">{department.title}</p>
            )}
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
              Посетителям
            </Link>
          </>
        )}
        {isPatientInfoPage && (
          <>
            <Link className="dynamic-route__link-privacy-policy" to="/patient-info">
              Пациентам
            </Link>
          </>
        )}
      </div>
    </section>
  );
}

export default DynamicRoute;
