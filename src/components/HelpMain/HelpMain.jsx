import React from "react";
import "./HelpMain.css";
import Button from "../Button/Button";

function HelpMain() {
  return (
    <section className="help-main">
      <div className="help-main__container">
        <img
          className="help-main__banner"
          src={"https://i.postimg.cc/qqhdtP36/image-37.png"}
          alt="Баннер блока для родственников"
        />
        <div className="help-main__text-container">
          <h1 className="help-main__title">Если ваш близкий у нас</h1>
          <p className="help-main__text">
            Body text for whatever you d like to say. Add main takeaway points,
            quotes, anecdotes, or even a very very short story. Body text for
            whatever you d like to say. Add main takeaway points, quotes,
            anecdotes, or even a very very short story. Body text for whatever
            you d like to say.
          </p>
					<div className="help-main__button-container">

					<button className="help-main__button"> Узнать</button>
					</div>
          {/* <button className="help-main__button">Узнать</button> */}
        </div>
      </div>
    </section>
  );
}

export default HelpMain;
