import React from "react";
import MapCard from "./MapCard/MapCard";
import "./Map.css";

function Map() {
  return (
    <section className="map">
      <div className="map__container">
        <h1 className="map__title">Как добраться</h1>
        <div className="map__cards-container">
          <MapCard
            title="Стационар ГБУЗ «ГКБ № 24»"
            address="127015, Москва, Писцовая, д. 10"
            coordinates={[55.796289, 37.561818]}
            description="От станции метро «Савёловская» (первый вагон из центра, выход №1) нужно перейти начало Бутырской улицы по подземному переходу            и на улицу через правую лестницу, на улице сразу налево на 2-ю Квессинскую улицу. Перейти перекресток на светофоре наискось и двигаться по Вятской улице вверх до первого поворота направо, на Писцовую улицу. Дальше двигаетесь прямо до главного входа в больницу."
						
          />
          <MapCard
            title="Отделение реабилитации стомированных больных"
            address="125167, Москва, Планетная, д. 26"
            coordinates={[55.803034, 37.546057]}
            description="От станции метро «Аэропорт» (выход №4) нужно пройти вниз до первого поворота налево в Авиационный переулок. Идти прямо, пересечь Красноармейскую улицу, двигаясь прямо по Старому Зыковскому проезду до пересечения с Планетной улицей."
						cardStyle="title-2"
          />
        </div>
      </div>
    </section>
  );
}

export default Map;
