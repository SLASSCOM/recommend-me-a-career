import Link from "next/link";
import styles from "./header.css";

export default function Header() {
    return (
        <header className="header">
            <div className="logo">
                <a href="https://open.uom.lk/index.html">
                    <a className="navbarBrand">
                        <img src="https://open.uom.lk/assets/images/logo.png" alt="" />
                    </a>
                </a>
            </div>
            <div className="headerRight">
                <a href="https://open.uom.lk/recommend.html" className="coursesLink">Courses</a>
                <a href="https://open.uom.lk/lms/my" className="loginBtn">Login</a>
            </div>
        </header>
    );
}
