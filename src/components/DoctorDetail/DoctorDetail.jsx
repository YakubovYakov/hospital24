import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { doctors } from "../../data/doctorsData";
import DynamicRoute from "../DynamicRoute/DynamicRoute";
import DoctorCard from "../DoctorCard/DoctorCard";
import Feedback from "../Feedback/Feedback";
import FeedbackButtons from "../Feedback/FeedbackButtons/FeedbackButtons";
import { feedbacks } from "../../feedbacks/doctorReviews";

function DoctorDetail({ id: propId }) {
  const { id } = useParams();
  const doctorId = parseInt(id, 10);

  const doctor = doctors.find((doc) => doc.id === doctorId);
  const doctorFeedbacks =
    feedbacks.filter((fb) => fb.docId === parseInt(doctorId, 10)) || [];

  console.log("doctorFeedbacks:", doctorFeedbacks);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!doctor) {
    return <div>Доктор не найден</div>;
  }

  return (
    <section className="doctor-detail">
      <div className="doctor-detail__container">
        <DoctorCard
          full_name={doctor.full_name}
          position={doctor.position}
          description={doctor.description}
          experience={doctor.experience}
          education={doctor.education}
          professional_experience={doctor.professional_experience}
          photos={doctor.photos}
        />
      </div>
      <Feedback feedbacks={doctorFeedbacks} />
      <FeedbackButtons
        title="Оставить отзыв"
        description={`${
          doctor ? doctor.full_name : ""
        } будет вам очень благодарен!`}
      />
    </section>
  );
}

export default DoctorDetail;
