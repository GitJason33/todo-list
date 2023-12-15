import { Link } from "react-router-dom";
import styles from "@/styles/layouts.module.scss";
import { useAuth, useConfirm } from "@/context/contextHooks";


export default function Navbar() {
  const { isLoggedIn, logoutUser } = useAuth();


  return (
    <nav className={styles.navbar}>
      <aside>
        {isLoggedIn ? (
          <Link to="/dashboard" className={styles.navItem}>
            <i className="fa-solid fa-calendar-check"></i>
            {" Dashboard"}
          </Link>
        ) : (
          <Link to="/" className={styles.navItem}>
            <i className="fa-solid fa-house"></i>
            {" Home"}
          </Link>
        )}
      </aside>

        
      {isLoggedIn ? (
        <NavMenu logout={logoutUser} />
      ) : (
        <aside>
          <Link to="/acc/login" className={styles.navItem}>
            <i className="fa-solid fa-right-to-bracket"></i>
            {" Login"}
          </Link>
        </aside>
      )}
    </nav>
  )
}



function NavMenu({ logout }) {
  const { openConfirm } = useConfirm();

  return (
    <aside className="flex items-center">
      {/* this is hidden all time */}
      <input id="dropdownToggler" type="checkbox" className={styles.dropdownToggler} aria-hidden="true" />


      {/* this is the menu icon 2 bars, becomes x-mark on checkbox check */}
      <label htmlFor="dropdownToggler" className={`${styles.navItem} ${styles.navMenuIcon}`}>
        <span></span>
        <span></span>
      </label>


      {/* toggles when checkbox is checked */}
      <menu className={styles.dropdown}>
        <Link to="/acc/profile">
          <i className="fa-solid fa-user"></i>
          {" Profile"}
        </Link>

        <button 
          className="!text-high" 
          onClick={() => openConfirm("Logout of your account?", logout)}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          {" Logout"}
        </button>
      </menu>
    </aside>
  )
}
