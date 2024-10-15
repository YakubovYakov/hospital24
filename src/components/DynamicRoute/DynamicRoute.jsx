import React from "react";
import "./DynamicRoute.css";
import { Link } from "react-router-dom";

function DynamicRoute({ doctorName }) {
  return (
    <section className="dynamic-route">
      <div className="dynamic-route__container">
        <Link className="dynamic-route__link-home" to="/">
          Главная
        </Link>
        <Link className="dynamic-route__link-our-doctors" to="/our-doctors">
          Наши врачи
        </Link>
        {doctorName && <p className="dynamic-route__doctor">{doctorName}</p>}
      </div>
    </section>
  );
}

export default DynamicRoute;
