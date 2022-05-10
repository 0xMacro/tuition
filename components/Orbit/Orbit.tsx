import styles from "./Orbit.module.css";

const Orbit = () => {
  return (
    <div id={styles["circle-orbit-container"]}>
      {Array.from({ length: 4 }).map((_el, i) => {
        return (
          <div
            key={i}
            id={styles[`outer-orbit-${i}`]}
            className={styles["outer-orbit-general"]}
          >
            <div className={styles[`planet`]}></div>
          </div>
        );
      })}
    </div>
  );
};
export default Orbit;
