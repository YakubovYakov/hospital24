import React, { useEffect, useState } from "react";
import "./DoctorList.css";
import Button from "../../Button/Button";
import DoctorPreviewCard from "../../Doctors/DoctorPreviewCard/DoctorPreviewCard";
import { doctors } from "../../../data/doctorsData";

import search from "../../../images/svg/Search.svg";

const ITEMS_PER_PAGE = 9;

function DoctorList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  useEffect(() => {
    const filtered = doctors.filter((doctor) =>
      doctor.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(filtered);
    setCurrentPage(1);
  }, [searchTerm]);

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

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="doctor-list">
      <div className="doctor-list__container">
        <div className="doctor-list__top">
          <form
            className="doctor-list__form"
            onSubmit={(e) => e.preventDefault()}
          >
            <div class="doctor-list__search-wrapper">
              <input
                className="doctor-list__search-input"
                placeholder="Поиск"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img
                src={search}
                alt="Search Icon"
                class="doctor-list__search-icon"
              />
            </div>
          </form>
          <div className="doctor-list__change-buttons">
            <Button size="small">По алфавиту</Button>
            <Button size="small" color="third">По отзывам</Button>
          </div>
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
            onClick={handlePrevClick}
            disabled={currentPage === 1}
            className="doctor-list__prev-button"
          >
           
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              className={`doctor-list__page-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
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
