import React from "react";
import "./MoscowLogo.css";
import moscow_logo from "../../images2/moscow-medecine/logo-moscow-medecine.svg";
import { Link } from "react-router-dom";

function MoscowLogo() {
  return (
    <section className="moscow-logo">
      <div className="moscow-logo__container">
        <Link
          to="/"
          className="moscow-logo__logo"
          // src={moscow_logo}
          alt="Логотип московской медицины"
        />

        <button className="moscow-logo__button-version">
          Версия для слабовидящих
        </button>
      </div>
    </section>
  );
}

export default MoscowLogo;
