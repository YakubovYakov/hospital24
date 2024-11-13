import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function MapCard({
  title,
  address,
  tel,
  coordinates,
  description,
  cardStyle,
  link,
}) {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) {
        mapRef.current = new window.ymaps.Map(mapContainerRef.current, {
          center: coordinates,
          zoom: 14,
          controls: ["zoomControl", "routeButtonControl"],
        });

        const routeButton = new window.ymaps.control.RouteButton({
          options: { float: "right" },
        });
        mapRef.current.controls.add(routeButton);
      }
    };

    if (window.ymaps) {
      window.ymaps.ready(initMap);
    } else {
      const script = document.createElement("script");
      script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
      script.onload = () => {
        window.ymaps.ready(initMap);
      };
      document.head.appendChild(script);
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, [coordinates]);

  return (
    <div className="map__card">
      <h2 className={`map__card-title ${cardStyle}`}>{title}</h2>
      <div className="map__card-text-container">
        <div>
          <h3 className="map__card-address">Адрес</h3>
          <span className="map__card-span">{address}</span>
        </div>
        <div>
          <h3 className="map__card-address">Телефон</h3>
          <span className="map__card-span">{tel}</span>
          <a href={link} className="map__card-button" target="_blank">
            Построить маршрут
          </a>
        </div>
      </div>
      <div className="map__card-container">
        <div
          className="map__card-map"
          ref={mapContainerRef}
          style={{ width: "476px", height: "201px" }}
        ></div>
      </div>
      {description && (
        <>
          <h4 className="map__card-text-title">Пешком</h4>
          <p className="map__card-text">{description}</p>
        </>
      )}
    </div>
  );
}

export default MapCard;
