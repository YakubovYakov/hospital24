import React, { useEffect, useState } from "react";
import "./PhotoSlider.css";

function PhotoSlider({ photos, full_name }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Сортируем фото, главное фото будет первым
  const mainPhoto = photos.find((photo) => photo.is_main) || photos[0];

  // Отделяем остальные фото
  const thumbnailPhotos = photos.filter((photo) => photo !== mainPhoto);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Переключение на предыдущую фотографию
  const handleButtonPrevClick = () => {
    const newIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Переключение на следующую фотографию
  const handleButtonNextClick = () => {
    const newIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Выбор фото по миниатюре
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handleImageClick = () => {
    const newIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="photo-slider">
      {/* Главная фотография */}
      <div className="main-photo-container">
        <img
          src={photos[currentIndex]}
          alt={`Фото ${currentIndex + 1}`}
          className="main-photo"
          onClick={isMobile ? handleImageClick : undefined} // Переключение кликом на изображение на мобильной версии
        />
      </div>

      {/* Миниатюры и кнопки */}
      <div className="thumbnail-container">
        {!isMobile && ( // Кнопки отображаются только на десктопной версии
          <button
            className="slider-button prev-button"
            onClick={handleButtonPrevClick}
          />
        )}

        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Миниатюра фото ${index + 1}`}
            className={`thumbnail-photo ${
              index === currentIndex ? "active-thumbnail" : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}

        {!isMobile && ( // Кнопки отображаются только на десктопной версии
          <button
            className="slider-button next-button"
            onClick={handleButtonNextClick}
          />
        )}
      </div>
    </div>
  );
}

export default PhotoSlider;
