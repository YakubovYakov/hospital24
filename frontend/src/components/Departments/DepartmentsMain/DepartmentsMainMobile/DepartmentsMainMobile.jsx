import "../DepartmentsMain.css";
import Button from "../../../Button/Button";
function DepartmentsMainMobile() {
  const departments = [
    {
      id: 1,
      title: "Колопроктология",
      description: "Описание отделения Колопроктологии...",
    },
    {
      id: 2,
      title: "Гинекология",
      description: "Описание отделения Гинекологии...",
    },
    {
      id: 3,
      title: "Аллергология",
      description: "Описание отделения Аллергологии...",
    },
  ];
  return (
    <section className="departments__main-mobile">
      <div className="departments-main__mobile-container">
        <div className="departments-main__top">
          <div className="departments-main__button-container">
            <h1 className="departments-main__title">Наши отделения</h1>
            <Button to="/departments" size="small">
              Все
            </Button>
          </div>
        </div>
        <div className="department-main__list-mobile">
          {departments.map((department, index) => (
            <div key={index} className="departments-main__card">
              <h2 className="departments-main__card-title">
                {department.title}
              </h2>
              <p className="departments-main__card-text">
                {department.description}
              </p>
              <div className="departments-main__card-button_container">
                <Button to={`/departments/${department.id}`} color="secondary">
                  Подробнее
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DepartmentsMainMobile;
