import React, { useContext, useState, useEffect } from "react";
import data from "../data.json";

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [questionPool, setQuestionPool] = useState([...data]);
  const [isEnglish, setIsEnglish] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [rounds, setRounds] = useState(0);
  const [goodAnswers, setGoodAnswers] = useState(0);
  const [badAnswers, setBadAnswers] = useState(0);

  function populateQuestion() {
    setQuestionPool([...data]);
  }

  function getRandomQuestion() {
    if (questionPool.length > 0) {
      setLoading(true);
      const randomIndex = Math.floor(Math.random() * questionPool.length);
      const item = questionPool[randomIndex];
      setIsEnglish(Math.random() < 0.5);
      setCurrentQuestion(item);
      setLoading(false);
    } else {
      restart();
      console.log("restart");
      console.log(data);
    }
  }
  function restart() {
    populateQuestion();
    setRounds(0);
    setGoodAnswers(0);
    setBadAnswers(0);
  }

  function answerWasGood() {
    setGoodAnswers(goodAnswers + 1);
    setQuestionPool(
      questionPool.filter((question) => question.id !== currentQuestion.id)
    );
    getRandomQuestion(questionPool);
  }

  function answerWasBad() {
    getRandomQuestion(questionPool);
    setBadAnswers(badAnswers + 1);
  }

  function checkAnswer(answer) {
    setRounds(rounds + 1);
    if (isEnglish) {
      if (answer.toLowerCase() === currentQuestion.serbian.toLowerCase()) {
        answerWasGood();
      } else {
        answerWasBad();
      }
    } else {
      if (answer.toLowerCase() === currentQuestion.english.toLowerCase()) {
        answerWasGood();
      } else {
        answerWasBad();
      }
    }
    if (questionPool.length <= 0) alert("Game will reset");
  }

  useEffect(() => {
    setLoading(true);
    populateQuestion();
    getRandomQuestion();
  }, []);

  const value = {
    isEnglish,
    checkAnswer,
    currentQuestion,
    rounds,
    goodAnswers,
    badAnswers,
    loading,
  };
  return (
    <DataContext.Provider value={value}>
      {!loading && children}
    </DataContext.Provider>
  );
}
