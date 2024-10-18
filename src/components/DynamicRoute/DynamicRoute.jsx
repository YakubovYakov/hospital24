import React from "react";
import "./DynamicRoute.css"
import { useParams, Link, useLocation } from "react-router-dom";
import { doctors } from "../../data/doctorsData";
import { departments } from "../../data/departmentsData";

function DynamicRoute() {
  const { id } = useParams();
  const location = useLocation();

  // Проверяем, на какой странице находится пользователь
  const isDoctorPage = location.pathname.includes("/doctor");
  const isOurDoctorsPage = location.pathname === "/our-doctors";
  const isDepartmentPage = location.pathname.includes("/departments");

  // Поиск врача или отделения по id
  const doctor = isDoctorPage ? doctors.find((doc) => doc.id === parseInt(id, 10)) : null;
  const department = isDepartmentPage && id ? departments.find((dept) => dept.id === parseInt(id, 10)) : null;

  return (
    <section className="dynamic-route">
      <div className="dynamic-route__container">
        <Link className="dynamic-route__link-home" to="/">
          Главная
        </Link>

        {isOurDoctorsPage && (
          <p className="dynamic-route__current">Наши врачи</p>
        )}

        {isDoctorPage && doctor && (
          <>
            <Link className="dynamic-route__link-doctors" to="/our-doctors">
              Наши врачи
            </Link>
            <p className="dynamic-route__current">{doctor.full_name}</p>
          </>
        )}

        {isDepartmentPage && (
          <>
            <Link className="dynamic-route__link-departments" to="/departments">
              Отделения
            </Link>
            {department && <p className="dynamic-route__current">{department.title}</p>}
          </>
        )}
      </div>
    </section>
  );
}

export default DynamicRoute;
