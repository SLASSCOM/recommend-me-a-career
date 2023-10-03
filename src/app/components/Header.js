"use client";
import Link from "next/link";
import "./header.css";
import { useEffect } from "react";



export default function Header() {
    // JavaScript to handle the menu toggle
    useEffect(() => {
        // This code will run in the client-side context
        const menuToggle = document.getElementById("menu-toggle");
        const menu = document.querySelector(".menu");
    
        if (menuToggle && menu) {
          menuToggle.addEventListener("click", function () {
            menu.classList.toggle("active");
          });
        }
      }, []); // Empty dependency array ensures it runs only once, similar to DOMContentLoaded
    

    return (
        <header className="header">
            <div className="logo">
                <Link href="https://open.uom.lk/">
                    <div className="navbarBrand">
                        <img src="https://open.uom.lk/assets/images/logo.png" alt="moraLogo" />
                    </div>
                </Link>
            </div>
            <div className="headerRight">
                <Link href="https://open.uom.lk/recommend.html" className="coursesLink">Courses</Link>
                <Link href="https://open.uom.lk/lms/my/" className="loginBtn">Login</Link>
            </div>
        </header>
    );
}
