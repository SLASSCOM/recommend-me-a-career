"use client";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import quizData from "./questions";
import careersData from "./careers.json"; // Import the careers list
import links from "./links"; // Import the career links
import "./globals.css";
import Script from "next/script";

const Page = () => {  
  // Function to generate a unique sessionId
  const generateSessionId = () => {
    return "OUOMLK" + Math.random().toString(36).substring(2) + "OpenUomLk" + Date.now().toString(36) + "2023" + Date.now().toString(18) +  + Math.random().toString(36).substring(3) + "SID";
  };
  const [session, setSession] = useState(generateSessionId());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(quizData.Questions.length).fill(null));
  const [recommendedCareers, setRecommendedCareers] = useState([]);
  const [showLog, setShowLog] = useState(false);
  const resultCount = 10;



  // Function to call the first API
  const callInsertAnswerAPI = async (question, answer) => {
    const url = `https://script.google.com/macros/s/AKfycbwCaeWzrO5bdVJ29WKAekKHJJcmqAWiRzZT0FCtkHlS0xkhaDQiSnoH7NYStlwVSBzvVw/exec?action=insertAnswer&sessionId=${session}&question=${question}&answer=${answer}`;
    
    try {
      const response = await fetch(url);
      if (response.ok) {
        // API call was successful, handle the response if needed
      } else {
        // Handle errors if the API call fails
      }
    } catch (error) {
      // Handle network errors
    }
  };

  // Function to call the second API
  const callInsertRecommendationsAPI = async (recommendations) => {
    const url = `https://script.google.com/macros/s/AKfycbwCaeWzrO5bdVJ29WKAekKHJJcmqAWiRzZT0FCtkHlS0xkhaDQiSnoH7NYStlwVSBzvVw/exec?action=insertRecommendations&sessionId=${session}&recommendation=${recommendations.join('&recommendation=')}`;
    
    try {
      const response = await fetch(url);
      if (response.ok) {
        // API call was successful, handle the response if needed
      } else {
        // Handle errors if the API call fails
      }
    } catch (error) {
      // Handle network errors
    }
  };

  useEffect(() => {
    // Set the initial session ID when the component mounts
    setSession(generateSessionId());
  }, []);

  const handleNextButtonClick = async () => {
    if (currentQuestion < quizData.Questions.length - 1) {
      if (userAnswers[currentQuestion] !== null) {
        const question = quizData.Questions[currentQuestion].Caption;
        const answer = quizData.Questions[currentQuestion].Answers[userAnswers[currentQuestion]].Caption;
        callInsertAnswerAPI(question, answer); // Pass the session ID
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Handle the case where the user hasn't selected an answer
      }
    } else if (currentQuestion === quizData.Questions.length - 1) {
      calculateResults(); // No need to pass the session ID
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
    
    // Call the second API with the recommended careers
    callInsertRecommendationsAPI(recommendedCareers);

    setShowLog(false); // Hide the log
  };

  const handleAnswerChange = (event) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestion] = parseInt(event.target.value);
    setUserAnswers(updatedUserAnswers);
  };

  const questionData = quizData.Questions[currentQuestion];
  const questionNumber = currentQuestion + 1;
  const totalQuestions = quizData.Questions.length;
  const showBackButton = currentQuestion > 0;
  const isNextButtonDisabled = userAnswers[currentQuestion] === null;

  return (
    <div>
      <Header />
      <div className="container">
        {!recommendedCareers.length > 0 && (
          <h1 className="mainHeading">Which tech job is best for my personality?</h1>
        )}
        <div id="quiz-form" className="quiz-container">
          {recommendedCareers.length === 0 ? (
            <div className="question-container">
              <h3>Question {questionNumber} of {totalQuestions}</h3>
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
                    <a href={links[career]} target="_blank" rel="noopener noreferrer">
                      {career}
                    </a>
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
};

export default Page;
