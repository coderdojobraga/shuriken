import { useTheme } from "../Theme";

import styles from "./style.module.css";

<<<<<<< HEAD
function DarkModeToggle({ visible }) {
  const { isDark, toggleTheme } = useTheme();
  return (
    visible && (
      <button onClick={toggleTheme}>
        {isDark ? 
          <div className={styles.circle_dark}>
            <div className={styles.crescent_dark}></div>
          </div>
         : 
          <div className={styles.circle}>
            <div className={styles.crescent}></div>
          </div>
        }
      </button>
    )
=======
function DarkModeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      {isDark ? (
        <div className={styles.circle_dark}>
          <div className={styles.crescent_dark}></div>
        </div>
      ) : (
        <div className={styles.circle}>
          <div className={styles.crescent}></div>
        </div>
      )}
    </button>
>>>>>>> f4f0760 (Add blog post page (#45))
  );
}

export default DarkModeToggle;
