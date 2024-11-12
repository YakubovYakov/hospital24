import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doctors } from "../../../data/doctorsData";
import DynamicRoute from "../../DynamicRoute/DynamicRoute";
import DoctorCard from "../DoctorCard/DoctorCard";
import Feedback from "../../Feedback/Feedback";
import FeedbackButtons from "../../Feedback/FeedbackButtons/FeedbackButtons";
import FeedbackMobile from "../../Feedback/FeedbackMobile/FeedbackMobile";
import { feedbacks } from "../../../feedbacks/doctorReviews";
import { fetchDoctorById } from "../../../utils/api";

function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleMediaQueryChange = (e) => setIsMobileView(e.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    setLoading(true);
    fetchDoctorById(id)
      .then((data) => {
        setDoctor(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        setError("Не удалось загрузить данные врача.");
        setLoading(false);
      });

    return () =>
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (!doctor) return <div>Врач не найден</div>;

  return (
    <section className="doctor-detail">
      <div className="doctor-detail__container">
        <DoctorCard
          full_name={doctor.full_name}
          position={doctor.positions}
          description={doctor.descriptions}
          experience={doctor.start_experience}
          education={doctor.education}
          professional_experience={doctor.experiences}
          photos={doctor.photos}
        />
      </div>
      {isMobileView ? (
        <FeedbackMobile empId={doctor.id} />
      ) : (
        <Feedback empId={doctor.id} />
      )}
      <FeedbackButtons
        title="Оставить отзыв"
        description={`${doctor.full_name} будет вам очень благодарен!`}
      />
    </section>
  );
}

export default DoctorDetail;
