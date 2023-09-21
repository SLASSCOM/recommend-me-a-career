import Link from "next/link";
import "./header.css";

export default function Header() {
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
