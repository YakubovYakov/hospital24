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
        <div className="moscow-logo__button-container">
          <Link
            to="http://vsn.24gkb.ru"
            className="moscow-logo__button-version"
          >
            Версия для слабовидящих
          </Link>
          <Link to="http://www.24gkb.ru" className="moscow-logo__button-old-site">
            Старая версия сайта
          </Link>
        </div>
      </div>
    </section>
  );
}

export default MoscowLogo;
