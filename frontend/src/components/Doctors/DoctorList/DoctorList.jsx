import React, { useEffect, useState, useRef } from "react";
import "./DoctorList.css";
import Button from "../../Button/Button";
import DoctorPreviewCard from "../../Doctors/DoctorPreviewCard/DoctorPreviewCard";
import search from "../../../images/svg/Search.svg";

import { fetchDoctors } from "../../../utils/api";

const ITEMS_PER_PAGE = 3;

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Флаг наличия дополнительных данных
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

        // Проверяем, есть ли еще данные для загрузки
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

  if (error) return <div>{error}</div>;

  return (
    <section className="doctor-list">
      <div className="doctor-list__container">
        <div className="doctor-list__card-container">
          {doctors.map((doctor, index) => {
            const isLastDoctor = index === doctors.length - 1;
            return (
              <div
                key={doctor.id}
                ref={isLastDoctor ? lastDoctorRef : null}
              >
                <DoctorPreviewCard doctor={doctor} />
              </div>
            );
          })}
        </div>
        {loading && <div>Загрузка данных...</div>}
        {!hasMore && <div className="no-more-data">Данные закончились</div>}
      </div>
    </section>
  );
}

export default DoctorList