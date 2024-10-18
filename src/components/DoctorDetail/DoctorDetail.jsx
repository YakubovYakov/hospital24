import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { doctors } from "../../data/doctorsData";
import DynamicRoute from "../DynamicRoute/DynamicRoute";
import DoctorCard from "../DoctorCard/DoctorCard";
import Feedback from "../Feedback/Feedback";

function DoctorDetail({ id: propId }) {
  const { id } = useParams();
  const doctorId = parseInt(id, 10);

  const doctor = doctors.find((doc) => doc.id === doctorId);

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
			<Feedback />
    </section>
  );
}

export default DoctorDetail;
