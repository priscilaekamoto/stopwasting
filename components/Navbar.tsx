import React from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import NavIcon from "../components/icon/navIcon";
import LogoIcon from "../components/icon/LogoIcon";

const Navbar = () => {

  return (
    <div className={styles.navbar}>
      <div className={styles.menuLogoDiv}>
        <div className={styles.menuLogo}>
          <LogoIcon src="/images/icons/main-logo.png" />
          <a className={styles.appTitle}>StopWasting</a>
        </div>
        <div className={styles.borderHover}></div>
      </div>
      <div className={styles.menuOpts}>
        <div className={styles.menuComponent}>
          <div className={styles.menuItemDiv}>
            <div className={styles.menuItem}>
              <NavIcon src="/images/icons/home-icon.png" />
              <Link className={styles.link} href="/home">Home</Link>
            </div>
            <div className={styles.borderHoverItem}></div>
          </div>

          <div className={styles.menuItemDiv}>
            <div className={styles.menuItem}>
              <NavIcon src="/images/icons/food-icons.png" />
              <Link className={styles.link} href="/alimento">Alimentos</Link>
            </div>
            <div className={styles.borderHoverItem}></div>
          </div>

          <div className={styles.menuItemDiv}>
            <div className={styles.menuItem}>
              <NavIcon src="/images/icons/alert-icon.png" />
              <Link className={styles.link} href="/alertas">Alertas</Link>
            </div>
            <div className={styles.borderHoverItem}></div>
          </div>

          <div className={styles.menuItemDiv}>
            <div className={styles.menuItem}>
              <NavIcon src="/images/icons/logout-icon.png" />
              <Link className={styles.link} href="/logout">Logout</Link>
            </div>
            <div className={styles.borderHoverItem}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;