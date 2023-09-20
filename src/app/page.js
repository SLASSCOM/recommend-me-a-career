"use client";
import React, { useState } from "react";
import Header from "./components/Header";
import quizData from "./questions";
import careersData from "./careers.json"; // Import the careers list
import "./globals.css";
import Script from "next/script";

const Page = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(quizData.Questions.length).fill(null));
  const [recommendedCareers, setRecommendedCareers] = useState([]);
  const [showLog, setShowLog] = useState(false);
  const resultCount = 10;

  const handleNextButtonClick = () => {
    if (currentQuestion < quizData.Questions.length - 1) {
      if (userAnswers[currentQuestion] !== null) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Handle the case where the user hasn't selected an answer
      }
    } else if (currentQuestion === quizData.Questions.length - 1) {
      // If on the 11th question, calculate results
      calculateResults();
    }
  };

  const handleBackButtonClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
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
    setShowLog(false); // Hide the log
  };

  const handleAnswerChange = (event) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestion] = parseInt(event.target.value);
    setUserAnswers(updatedUserAnswers);
  };

  const questionData = quizData.Questions[currentQuestion];

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Which tech job is best for my personality?</h1>
        <div id="quiz-form" className="quiz-container">
          {recommendedCareers.length === 0 && (
            <div className="question-container">
              <h3>Question {currentQuestion + 1} / 11</h3>
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
                <button
                  id="back"
                  className={`action-btn ${
                    currentQuestion === 0 ? "disabled" : ""
                  }`}
                  onClick={handleBackButtonClick}
                >
                  Back
                </button>
                <button
                  id="next"
                  className="action-btn"
                  onClick={handleNextButtonClick}
                >
                  {currentQuestion === quizData.Questions.length - 1
                    ? "Calculate Results"
                    : "Next"}
                </button>
              </div>
            </div>
          )}

          {recommendedCareers.length > 0 && (
            <div className="result">
              <h2>Recommended careers for you in priority order</h2>
              <ol id="careerList">
                {recommendedCareers.map((career, index) => (
                  <li key={index}>{career}</li>
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
{/* 
        <button
          id="showLogBtn"
          className={`action-btn ${
            recommendedCareers.length > 0 || showLog ? "hidden" : ""
          }`}
          onClick={handleShowLogClick}
        >
          Show Answer Log
        </button> */}
      </div>
    </div>
  );
};

export default Page;

