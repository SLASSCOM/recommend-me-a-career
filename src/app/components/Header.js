"use client";
/* JavaScript in Header.js */
import Link from "next/link";
import { useEffect, useState } from "react";
import './header.css';

export default function Header() {
  useEffect(() => {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.querySelector(".menu");

    if (menuToggle && menu) {
      menuToggle.addEventListener("change", function () {
        menu.classList.toggle("active");
      });
    }
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <Link href="https://open.uom.lk/">
          <div className="navbarBrand">
            <img
              src="https://open.uom.lk/assets/images/logo.png"
              alt="moraLogo"
            />
          </div>
        </Link>
      </div>
      
      {/* Show header-right only on larger screens */}
      <div className="header-right">
        <Link href="https://open.uom.lk/recommend.html" target="_blank" className="courses-link">
          Courses
        </Link>
        <Link href="https://open.uom.lk/lms/my/" className="login-btn">
          Login
        </Link>
      </div>
      
      {/* Mobile Hamburger Menu */}
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label for="menu-toggle" class="menu-label">&#9776;
      </label>
      <div className="menu">
        <Link href="https://open.uom.lk/recommend.html" className="courses-link">
          Courses
        </Link>
        <button className="login-btn-mobile" type="button">
        <Link href="https://open.uom.lk/lms/my/" className="login-btn">
          Login
        </Link>
        </button>
      </div>
    </header>
  );
}
