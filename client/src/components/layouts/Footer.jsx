import { Link } from 'react-router-dom';
import styles from '@/styles/layouts.module.scss';
import { useAuth, useConfirm } from '@/context/contextHooks';


export default function Footer() {
  const { isLoggedIn, logoutUser } = useAuth();
  const { openConfirm } = useConfirm();


  return (
    <footer className={styles.footer}>
      <div className={styles.footContainer}>
        <section className={styles.footSect}>
          <h3 className={styles.footTitle}>Social media</h3>

          <ul>
            <a
              href="https://github.com/GitJason33"
              target="_blank"
              rel="noreferrer"
              className={styles.footItem}
            >
              <i className="fa-brands fa-github"></i>
              {' GitHub'}
            </a>

            <a
              href="mailto:jason.freelance876@gmail.com"
              target="_blank"
              rel="noreferrer"
              className={styles.footItem}
            >
              <i className="fa-solid fa-envelope"></i>
              {' Email'}
            </a>
          </ul>
        </section>

        <section className={styles.footSect}>
          <h3 className={styles.footTitle}>Useful links</h3>
          <ul>
            <Link to="/" className={styles.footItem}>
              <i className="fa-solid fa-house"></i>
              {' Home'}
            </Link>

            <Link to="/acc/login" className={styles.footItem}>
              <i className="fa-solid fa-right-to-bracket"></i>
              {' Login'}
            </Link>

            {isLoggedIn && (
              <button 
                className={`${styles.footItem} !text-high font-bold`}
                onClick={() => openConfirm("Logout of your account?", logoutUser)}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                {' Logout'}
              </button>
            )}
          </ul>
        </section>
      </div>

      <Copyright />
    </footer>
  );
}

function Copyright() {
  return (
    <div className="p-3 bg-weak text-center text-dark">
      © 2023 Jason Dirany. All rights reserved.
    </div>
  );
}
