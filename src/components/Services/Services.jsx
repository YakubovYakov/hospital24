import React from "react";
import "./Services.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";


function Services() {
  return (
    <section className="services">
      <div className="services__container">
        <div className="services__cards">
          <div className="services__card">
            <img
              className="services__card-image"
              src={"https://i.postimg.cc/zDkCxRK2/services1.png"}
              alt="Фото сервиса"
            />
            <h2 className="services__card-title">У вас направление к нам?</h2>
            <p className="services__card-text">
              Body text for whatever you d like to say. Add main takeaway
              points, quotes, anecdotes, or even a very very short story.
            </p>
            <div className="services__card-button_container">
              <Button to="/" color="secondary">
                Записаться по направлению
              </Button>
            </div>
          </div>
          <div className="services__card">
            <img
              className="services__card-image"
              src={"https://i.postimg.cc/D07q22kc/services2.png"}
              alt="Фото сервиса"
            />
            <h2 className="services__card-title">
              Вы из региона и хотите лечиться у нас по ОМС?
            </h2>
            <p className="services__card-text">
              Body text for whatever you d like to say. Add main takeaway
              points, quotes, anecdotes, or even a very very short story.
            </p>
            <div className="services__card-button_container">
              <Button to="/" color="secondary">
                Лечиться по ОМС
              </Button>
            </div>
          </div>
          <div className="services__card">
            <img
              className="services__card-image"
              src={"https://i.postimg.cc/cCTfCVdG/services3.png"}
              alt="Фото сервиса"
            />
            <h2 className="services__card-title">
              Хотите пройти лечение платно?
            </h2>
            <p className="services__card-text">
              Body text for whatever you d like to say. Add main takeaway
              points, quotes, anecdotes, or even a very very short story.
            </p>
            <div className="services__card-button_container">
              <Button to="/" color="secondary">
                Пройти лечение
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
