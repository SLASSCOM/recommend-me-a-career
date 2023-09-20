"use client";
import React, { useState } from "react";
import Header from "./components/Header";
import quizData from "../../public/questions";
import Link from "next/link";
import "./globals.css";

const Page = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [careerLists, setCareerLists] = useState([]);
  const [showLog, setShowLog] = useState(false);
  const resultCount = 10;

  const handleNextButtonClick = () => {
    if (currentQuestion < quizData.Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const formData = new FormData(document.getElementById("quiz-form"));
    const userChoices = Array.from(formData.values());

    const careerCount = {};

    userChoices.forEach((choice) => {
      const careers =
        quizData.Questions[currentQuestion - 1].Answers[choice].Careers;
      careerLists[currentQuestion] = careers;
      careers.forEach((career) => {
        careerCount[career] = (careerCount[career] || 0) + 1;
      });
    });

    const recommendedCareers = Object.entries(careerCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, resultCount);

    setCareerLists([...careerLists]);
    displayResult();
    if (showLog) {
      displayLog();
    }
  };

  const displayResult = () => {
    const resultEl = document.getElementById("result");
    const careerListEl = document.getElementById("careerList");

    resultEl.classList.remove("hidden");
    careerListEl.innerHTML = "";

    careerLists[careerLists.length - 1].forEach((career, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = career;
      careerListEl.appendChild(listItem);
    });
  };

  const displayLog = () => {
    const careerLogEl = document.getElementById("log");
    careerLogEl.classList.remove("hidden");

    careerLogEl.innerHTML = "";

    careerLists.forEach((list, index) => {
      const listEl = document.createElement("ul");
      list.forEach((career) => {
        const listItem = document.createElement("li");
        listItem.textContent = career;
        listEl.appendChild(listItem);
      });
      const label = document.createElement("label");
      label.textContent =
        "Q:" + index + " - " + quizData.Questions[index - 1].Caption;
      careerLogEl.appendChild(label);
      careerLogEl.appendChild(listEl);
    });
  };

  const handleShowLogClick = () => {
    setShowLog(!showLog);
    displayLog();
  };

  const questionData = quizData.Questions[currentQuestion];

  return (
    <div>
        
      <Header />
      <div className="container">
        <h1>Which tech job is best for my personality?</h1>
        <form id="quiz-form" className="quiz-container">
          <div className="question-container">
            <h3>Question {currentQuestion + 1}</h3>
            <h2>{questionData.Caption}</h2>
            {questionData.Answers.map((answer, index) => (
              <div key={index} className="answer-container">
                <input
                  type="radio"
                  name={`question${currentQuestion}`}
                  id={`question${currentQuestion}answer${index}`}
                  value={index}
                />
                <label
                  htmlFor={`question${currentQuestion}answer${index}`}
                >
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
            onClick={goToPreviousQuestion}
          >
            Back
          </button>
          <button
            id="next"
            className="action-btn"
            onClick={handleNextButtonClick}
          >
            Next
          </button>
        </div>
          </div>
        </form>

        <div className="result hidden">
          <h2>Recommended careers for you in priority order</h2>
          <ol id="careerList"></ol>
          <button
            id="tryAgain"
            className="action-btn"
            onClick={() => {
              setCurrentQuestion(0);
              setUserAnswers([]);
              setCareerLists([]);
              displayQuestion();
            }}
          >
            Try Again
          </button>
        </div>
        {/* <div className="log hidden">
          <h2>Answer Log</h2>
          <ol id="log"></ol>
        </div>
        <button
          id="showLogBtn"
          className="action-btn"
          onClick={handleShowLogClick}
        >
          Show Answer Log
        </button>
      </div> */}
      </div>
    </div>
  );
};

export default Page;
