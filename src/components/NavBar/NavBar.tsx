import styles from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";

const NavBar: React.FC<{
  className?: { readonly [key: string]: string };
}> = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive ? styles.activeClassName : styles.navLink
        }
      >
        <button className={styles.button}>HOMEPAGE</button>
      </NavLink>
      <NavLink
        to={"/my-favorites"}
        className={({ isActive }) =>
          isActive ? styles.activeClassName : styles.navLink
        }
      >
        <button className={styles.button}>MY FAVORITES</button>
      </NavLink>
    </nav>
  );
};

export default NavBar;
