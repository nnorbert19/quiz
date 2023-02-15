import React from "react";
import { useData } from "../Context/DataContext";

function ShowQuestion() {
  const { currentQuestion, isEnglish } = useData();
  return (
    <>
      <img src={currentQuestion.image} className="quiz_image"></img>
      <h2 className="word">
        {isEnglish ? currentQuestion.english : currentQuestion.serbian}
      </h2>
    </>
  );
}

export default ShowQuestion;
