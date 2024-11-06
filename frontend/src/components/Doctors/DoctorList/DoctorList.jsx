import React, { useEffect, useState } from "react";
import "./DoctorList.css";
import Button from "../../Button/Button";
import DoctorPreviewCard from "../../Doctors/DoctorPreviewCard/DoctorPreviewCard";
import search from "../../../images/svg/Search.svg";

import { fetchDoctors } from "../../../utils/api"; 

const ITEMS_PER_PAGE = 5;

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      try {
        const data = await fetchDoctors();
        setDoctors(data);
        setFilteredDoctors(data);
        setLoading(false);
				console.log('Полученные данные врачей:', data);
      } catch (err) {
        setError("Ошибка при загрузке данных врачей.");
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  
  useEffect(() => {
    const filtered = doctors.filter((doctor) =>
      doctor.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(filtered);
    setCurrentPage(1);
  }, [searchTerm, doctors]);

  
  const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE);

  
  const currentDoctors = filteredDoctors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Загрузка данных...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="doctor-list">
      <div className="doctor-list__container">
        <div className="doctor-list__top">
          <form className="doctor-list__form" onSubmit={(e) => e.preventDefault()}>
            <div className="doctor-list__search-wrapper">
              <input
                className="doctor-list__search-input"
                placeholder="Поиск"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img src={search} alt="Search Icon" className="doctor-list__search-icon" />
            </div>
          </form>
        </div>
        <div className="doctor-list__card-container">
          {currentDoctors.length > 0 ? (
            currentDoctors.map((doctor) => (
              <DoctorPreviewCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <p>Врачи не найдены</p>
          )}
        </div>
        <div className="doctor-list__page-numbers">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="doctor-list__prev-button"
          >
          
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              className={`doctor-list__page-button ${currentPage === index + 1 ? "active" : ""}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="doctor-list__next-button"
          >
            
          </button>
        </div>
      </div>
    </section>
  );
}

export default DoctorList;