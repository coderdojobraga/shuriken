import { useTheme } from "../Theme";

import styles from "./style.module.css";

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
  );
}

export default DarkModeToggle;
