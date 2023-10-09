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
        <Link href="/">
          <div className="navbarBrand">
            <img
              src="./logo.png"
              alt="moraLogo"
            />
          </div>
        </Link>
      </div>
      
      {/* Show header-right only on larger screens */}
      <div className="header-right">
        <Link href="https://slasscom.lk" target="_blank" className="courses-link">
          SLASSCOM
        </Link>
      </div>
      
      {/* Mobile Hamburger Menu */}
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-label">&#9776;
      </label>
      <div className="menu">
      <Link href="https://slasscom.lk" target="_blank" className="courses-link">
          SLASSCOM
        </Link>
      </div>
    </header>
  );
}
