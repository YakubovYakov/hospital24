import React, { useEffect, useState, useRef } from "react";
import "./DoctorList.css";
import DoctorPreviewCard from "../../Doctors/DoctorPreviewCard/DoctorPreviewCard";
import searchIcon from "../../../images/svg/Search.svg";
import { fetchDoctors } from "../../../utils/api";

const ITEMS_PER_PAGE = 3;

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const observerRef = useRef();
  const lastDoctorRef = useRef();

  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      try {
        const result = await fetchDoctors(currentPage, ITEMS_PER_PAGE);
        const data = result.data;

        setDoctors((prevDoctors) => {
          const uniqueDoctors = [
            ...prevDoctors,
            ...data.filter(
              (newDoctor) => !prevDoctors.some((doc) => doc.id === newDoctor.id)
            ),
          ];
          return uniqueDoctors;
        });

        const totalLoaded = currentPage * ITEMS_PER_PAGE;
        if (totalLoaded >= result.totalItems) {
          setHasMore(false);
        }

        setLoading(false);
      } catch (err) {
        setError("Ошибка при загрузке данных врачей.");
        setLoading(false);
      }
    };

    loadDoctors();
  }, [currentPage]);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (lastDoctorRef.current) {
      observer.observe(lastDoctorRef.current);
    }

    return () => {
      if (lastDoctorRef.current) {
        observer.unobserve(lastDoctorRef.current);
      }
    };
  }, [doctors, loading, hasMore]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter((doctor) =>
        doctor.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDoctors(filtered);
    }
  }, [searchTerm, doctors]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Сбрасываем текущую страницу при новом поиске
  };

  if (error) return <div>{error}</div>;

  return (
    <section className="doctor-list">
      <div className="doctor-list__container">
        <form
          className="doctor-list__form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="doctor-list__search-wrapper">
            <input
              className="doctor-list__search-input"
              placeholder="Поиск"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <img
              src={searchIcon}
              alt="Search Icon"
              className="doctor-list__search-icon"
            />
          </div>
        </form>
        <div className="doctor-list__card-container">
          {filteredDoctors.map((doctor, index) => {
            const isLastDoctor = index === filteredDoctors.length - 1;
            return (
              <div key={doctor.id} ref={isLastDoctor ? lastDoctorRef : null}>
                <DoctorPreviewCard doctor={doctor} />
              </div>
            );
          })}
        </div>
        {loading && <div>Загрузка данных...</div>}
        {!hasMore && !loading && filteredDoctors.length === 0 && (
          <div className="no-more-data">Врачи не найдены</div>
        )}
      </div>
    </section>
  );
}

export default DoctorList;
