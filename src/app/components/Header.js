import Link from "next/link";
import styles from "./header.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <a href="https://open.uom.lk/index.html">
                    <a className={styles.navbarBrand}>
                        <img src="https://open.uom.lk/assets/images/logo.png" alt="" />
                    </a>
                </a>
            </div>
            <div>
                <a href="https://open.uom.lk/recommend.html" className={styles.coursesLink}>Courses</a>
                <a href="https://open.uom.lk/lms/my" className={styles.loginBtn}>Login</a>
            </div>
        </header>
    );
}
