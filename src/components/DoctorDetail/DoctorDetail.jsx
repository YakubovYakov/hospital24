import React from "react";
import { useParams } from "react-router-dom";
import { doctors } from "../../data/doctorsData";
import DynamicRoute from "../DynamicRoute/DynamicRoute";
import DoctorCard from "../DoctorCard/DoctorCard";

function DoctorDetail({ id: propId }) {
  const { id: paramId } = useParams();
  const doctorId = propId || paramId;

  const doctor = doctors.find((doc) => doc.id === parseInt(doctorId, 10));

  if (!doctor) {
    return <div>Доктор не найден</div>;
  }

  return (
    <section className="doctor-detail">
      <DynamicRoute doctorName={doctor.full_name} />
      <DoctorCard
        full_name={doctor.full_name}
        position={doctor.position}
        description={doctor.description}
        experience={doctor.experience}
        education={doctor.education}
        professional_experience={doctor.professional_experience}
        photos={doctor.photos}
      />
    </section>
  );
}

export default DoctorDetail;
