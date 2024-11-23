import React, { useState, useEffect } from "react";
import Preview from "../Preview/Preview";
import Services from "../../components/Services/Services";
import DoctorsMain from "../../components/Doctors/DoctorsMain/DoctorsMain";
import DoctorsMainMobile from "../Doctors/DoctorsMain/DoctorsMainMobile/DoctorsMainMobile";
import DepartmentsMain from "../../components/Departments/DepartmentsMain/DepartmentsMain";
import DepartmentsMainMobile from "../Departments/DepartmentsMain/DepartmentsMainMobile/DepartmentsMainMobile";
import HelpMain from "../../components/HelpMain/HelpMain";
import Feedback from "../../components/Feedback/Feedback";
import FeedbackMobile from "../Feedback/FeedbackMobile/FeedbackMobile";
import FeedbackButtons from "../../components/Feedback/FeedbackButtons/FeedbackButtons";
import { departmentFeedbacks } from "../../feedbacks/departmentReviews";

function Main({ doctors, feedbacks }) {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMediaQueryChange = (e) => {
      setIsMobileView(e.matches);
    };

    handleMediaQueryChange(mediaQuery);

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <>
      <Preview />
      <Services />

      <DoctorsMain doctors={doctors} />

      {isMobileView ? <DepartmentsMainMobile /> : <DepartmentsMain />}
      <HelpMain />
      {isMobileView ? (
        <FeedbackMobile feedbacks={departmentFeedbacks} />
      ) : (
        <Feedback feedbacks={departmentFeedbacks} />
      )}
      <FeedbackButtons title="Оставить отзыв" description={"Команда ГКБ 24 будет вам очень благодарна за оставленный отзыв!"}/>

      {/* <FeedbackMobile feedbacks={departmentFeedbacks} /> */}
    </>
  );
}

export default Main;
