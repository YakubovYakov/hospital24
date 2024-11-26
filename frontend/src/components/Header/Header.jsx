import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";
import search from "../../images2/svg/Search.svg";
import logo from "../../images2/Logotype.png";
import map from "../../images2/svg/Map.svg";
import eye from "../../images2/svg/Eye.svg";

function Header({ setIsBurgerMenuOpen }) {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <section className="header">
      <div className="header__container">
        <div>
          <Link className="header__logo" to="/">
            <img className="header__logo-img" src={logo} alt="logo" />
          </Link>
        </div>
        <div
          className="header__menu-button"
          onClick={() => setIsBurgerMenuOpen(true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div>
          <div className="header__buttons-bar">
            <Link
              to="/our-doctors"
              className={`header__button ${
                isActive("/our-doctors") || isActive("/doctor")
                  ? "active-button"
                  : ""
              }`}
            >
              Врачи
            </Link>
            <Link
              to="/departments"
              className={`header__button ${
                isActive("/departments") ? "active-button" : ""
              }`}
            >
              Отделения
            </Link>
            <Link
              to="/paid-services"
              className={`header__button ${
                isActive("/paid-services") ? "active-button" : ""
              }`}
            >
              Услуги
            </Link>
            <Link
              to="/contacts"
              className={`header__button ${
                isActive("/contacts") ? "active-button" : ""
              }`}
            >
              Контакты
            </Link>
            <Link
              to="/about-hospital"
              className={`header__button ${
                isActive("/about-hospital") ? "active-button" : ""
              }`}
            >
              О больнице
            </Link>
          </div>
        </div>
        <div className="header__date-content">
          <div className="header__numbers-phone">
            <span className="header__number">+ 7 495 685-17-94</span>
            <span className="header__number">+ 7 495 613-63-10</span>
          </div>
          <div className="header__address-container">
            <img
              className="header__address-img"
              src={map}
              alt="Указатель времени работы больницы"
            />
            <p className="header__address">ул. Писцовая 10</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
