"use client";
import React, { useState, useEffect } from "react";
import quizData from "./questions";
import "./quiz.css";
import { v4 as uuid } from "uuid";

export default function Quiz() {
  const [session, setSession] = useState(generateSessionId());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    Array(quizData.Questions.length).fill(null)
  );
  const [recommendedCareers, setRecommendedCareers] = useState([]);
  const [showLog, setShowLog] = useState(false);
  const resultCount = 10;

  // Function to generate a unique sessionId
  function generateSessionId() {
    return uuid();
  }

  useEffect(() => {
    // Set the initial session ID when the component mounts
    setSession(generateSessionId());
  }, []);

  // Function to call the first API
  async function callInsertAnswerAPI(question, answer) {
    const url = `https://script.google.com/macros/s/AKfycbyQ8ARQKdHGnvMj8DW4R1UKTVlRpgFOSGpfkLot7AcB-uyn9DEuYmfrvzh6hAf7Xor3hA/exec?action=insertAnswer&sessionId=${session}&question=${question}&answer=${answer}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(
          "error: ",
          response.status,
          response.statusText,
          response.url,
          " -"
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Function to call the second API
  async function callInsertRecommendationsAPI(recommendations) {
    const url = `https://script.google.com/macros/s/AKfycbyQ8ARQKdHGnvMj8DW4R1UKTVlRpgFOSGpfkLot7AcB-uyn9DEuYmfrvzh6hAf7Xor3hA/exec?action=insertRecommendations&sessionId=${session}&recommendation=${recommendations.join(
      "&recommendation="
    )}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(
          "error: ",
          response.status,
          response.statusText,
          response.url,
          " -"
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  // function handleNextButtonClick() {
  //   if (currentQuestion < quizData.Questions.length -1) {
  //     if (userAnswers[currentQuestion] !== null) {
  //       const question = quizData.Questions[currentQuestion].Caption;
  //       const answer = quizData.Questions[currentQuestion].Answers[userAnswers[currentQuestion]].Caption;
  //       callInsertAnswerAPI(question, answer);
  //       setCurrentQuestion(currentQuestion + 1);
  //     } else {
  //       // Handle the case where the user hasn't selected an answer
  //     }
  //   } else if (currentQuestion === quizData.Questions.length - 1) {
  //     calculateResults();
  //   }
  // }

  function handleNextButtonClick() {
    const question = quizData.Questions[currentQuestion].Caption;
    const answer =
      quizData.Questions[currentQuestion].Answers[userAnswers[currentQuestion]]
        .Caption;
    callInsertAnswerAPI(question, answer);

    if (currentQuestion === quizData.Questions.length - 1) {
      calculateResults();
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function handleBackButtonClick() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  function calculateResults() {
    const careerCount = {};

    userAnswers.forEach((choice, index) => {
      if (choice !== null) {
        const careers = quizData.Questions[index].Answers[choice].Careers;
        careers.forEach((career) => {
          careerCount[career] = (careerCount[career] || 0) + 1;
        });
      }
    });

    const sortedCareers = Object.entries(careerCount)
      .sort((a, b) => b[1] - a[1])
      .map((item) => item[0]);

    const recommendedCareers = sortedCareers.slice(0, resultCount);

    setRecommendedCareers(recommendedCareers);

    callInsertRecommendationsAPI(recommendedCareers);

    setShowLog(false);
  }

  function handleAnswerChange(event) {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestion] = parseInt(event.target.value);
    setUserAnswers(updatedUserAnswers);
  }

  const questionData = quizData.Questions[currentQuestion];
  const questionNumber = currentQuestion + 1;
  const totalQuestions = quizData.Questions.length;
  const showBackButton = currentQuestion > 0;
  const isNextButtonDisabled = userAnswers[currentQuestion] === null;

  return (
    <div className="quizContainer">
      <div className="container">
        {!recommendedCareers.length > 0 && (
          <h1 className="mainHeading">
            Which tech job is best for my personality?
          </h1>
        )}
        <div id="quiz-form" className="quiz-container">
          {recommendedCareers.length === 0 ? (
            <div className="question-container">
              <h3>
                Question {questionNumber} of {totalQuestions}
              </h3>
              <h2>{questionData.Caption}</h2>
              {questionData.Answers.map((answer, index) => (
                <div key={index} className="answer-container">
                  <input
                    type="radio"
                    name={`question${currentQuestion}`}
                    id={`question${currentQuestion}answer${index}`}
                    value={index}
                    checked={userAnswers[currentQuestion] === index}
                    onChange={handleAnswerChange}
                  />
                  <label htmlFor={`question${currentQuestion}answer${index}`}>
                    {answer.Caption}
                  </label>
                </div>
              ))}
              <div className="button-container">
                {showBackButton && (
                  <button
                    id="back"
                    className={`action-btn ${
                      currentQuestion === 0 ? "disabled" : ""
                    }`}
                    onClick={handleBackButtonClick}
                  >
                    Back
                  </button>
                )}
                <button
                  id="next"
                  className="action-btn"
                  onClick={handleNextButtonClick}
                  disabled={isNextButtonDisabled}
                >
                  {currentQuestion === quizData.Questions.length - 1
                    ? "Calculate Results"
                    : "Next"}
                </button>
              </div>
            </div>
          ) : (
            <div className="result">
              <h2>Recommended careers for you in priority order</h2>
              <ol id="careerList">
                {recommendedCareers.map((career, index) => (
                  <li key={index} className={index < 3 ? "highlighted" : ""}>
                    {career}
                  </li>
                ))}
              </ol>
              <button
                id="tryAgain"
                className="action-btn"
                onClick={() => {
                  setCurrentQuestion(0);
                  setUserAnswers(Array(quizData.Questions.length).fill(null));
                  setRecommendedCareers([]);
                }}
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
