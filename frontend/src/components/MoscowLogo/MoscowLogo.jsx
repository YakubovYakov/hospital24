import React from "react";
import "./MoscowLogo.css";
import moscow_logo from "../../images/moscow-medecine/logo-moscow-medecine.svg";

function MoscowLogo() {
  return (
    <section className="moscow-logo">
      <div className="moscow-logo__container">
        <img
          className="moscow-logo__logo"
          src={moscow_logo}
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
