"use client";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import quizData from "./components/questions";
import careersData from "./careers.json"; // Import the careers list
import links from "./links"; // Import the career links
import "./globals.css";
import Script from "next/script";
import Quiz from "./components/quizcomponent";

const Page = () => {  
  return (
    <div>
      <Header />
      <Quiz />
      </div>
  );
};

export default Page;
