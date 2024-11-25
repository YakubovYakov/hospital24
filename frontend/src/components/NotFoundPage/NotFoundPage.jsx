import React from "react";
import "./NotFoundPage.css";
import { Link } from "react-router-dom";

function NorFoundPage() {
  return (
    <section className="not-found">
      <div className="not-found__container">
        <div className="not-found__content">
          <div className="not-found__content-text">
            <p className="not-found__text">
              Страница, которую Вы запрашиваете, не существует. Возможно она
              устарела, или был введен неверный адрес в адресной строке
            </p>
            <p className="not-found__text">
              Неудобства временные, а современный сайт навсегда
            </p>
            <Link className="not-found__link" to="/">
              Вернуться на главную страницу
            </Link>
          </div>

          <img
            className="not-found__image"
            src={"https://www.gkb-24.ru/static/images-svg/not-found-image.svg"}
            alt="Иллюстрация программиста"
          />
        </div>
      </div>
    </section>
  );
}

export default NorFoundPage;
