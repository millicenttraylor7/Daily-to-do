import styles from '../App.module.css';

function About() {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.appContainer}>
        <h2>About This App</h2>
        <p>
          This is a simple Todo List app built with React and Airtable. You can
          add, update, and complete tasks. Todos are saved in Airtable so they
          persist across sessions.
        </p>
        <p>
          Author: Millicent Traylor
          <br />
          Built using React, React Router, and Airtable API.
        </p>
        <p>Feel free to explore the app and add your own tasks!</p>
      </div>
    </div>
  );
}

export default About;
