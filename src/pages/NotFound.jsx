import { Link } from 'react-router-dom';
import styles from '../App.module.css';

function NotFound() {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.appContainer}>
        <h2>Page Not Found</h2>
        <p>Oops! The page you are looking for does not exist.</p>
        <p>
          <Link to="/">Go back home</Link>
        </p>
      </div>
    </div>
  );
}

export default NotFound;
