import React, { useEffect, useState } from "react";
import { fetchAdministration } from "../../utils/api";
import "./Administration.css";

import plug_photo from "../../images2/svg/plug-photo.svg";

function Administration() {
  const [administrators, setAdministrators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAdministrators = async () => {
      try {
        const data = await fetchAdministration();
        setAdministrators(data || []);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке администраторов:", error);
        setError("Ошибка при загрузке администраторов");
        setLoading(false);
      }
    };
    loadAdministrators();
  }, []);

  const groupedAdministrators = administrators.reduce((groups, admin) => {
    const category = admin.administration_category || "Без категории";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(admin);
    return groups;
  }, {});

  const categoryOrder = ["Руководители", "Заместители", "Начальники"];

  const sortedCategories = categoryOrder.filter(
    (cat) => groupedAdministrators[cat]
  );

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="administration">
      <div className="administration__container">
        <h1 className="administration__title">Администрация</h1>
        {sortedCategories.map((category) => (
          <div key={category} className="administration__category">
            <h2 className="administration__category-title">{category}</h2>
            <div className="administration__cards">
              {groupedAdministrators[category].map((admin) => (
                <div key={admin.id} className="administration__card">
                  {admin.photo_url ? (
                    <img
                      src={admin.photo_url}
                      alt={admin.full_name}
                      className="administration__photo"
                    />
                  ) : (
                    <img
                      src={plug_photo}
                      alt="Заглушка"
                      className="administration__photo-placeholder"
                    />
                  )}
                  <h3 className="administration__name">{admin.full_name}</h3>
                  <p className="administration__position">
                    {admin.position_name || "Должность не указана"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Administration;
