import React from "react";
import styles from "./refreshModal.module.css";
import crossIcon from "../../assets/blue-cross.svg";
import { usePlayer } from "../../providers/gameProvider";

const initialArray = Array(9).fill(null);

export default function RefreshModal({
  winner,
  setRefresh,
  textContent,
  setSquares,
  setXIsNext,
}) {
  const { setStartNewGame, setScores, playerShape } = usePlayer();

  return (
    <div className={styles.container}>
      {!winner && (
        <div className={styles.crossIcon}>
          <img src={crossIcon} alt="" onClick={() => setRefresh(false)} />
        </div>
      )}

      <h4>{textContent}</h4>

      <div className={styles.btns}>
        <button
          className={styles.newGame}
          onClick={() => {
            setSquares(initialArray);
            setRefresh(false);
            setXIsNext(playerShape === "X" ? true : false);
          }}
        >
          NEW GAME
        </button>
        <button
          onClick={() => {
            setScores(JSON.stringify({ user: 0, tie: 0, cpu: 0 }));
            setStartNewGame(false);
          }}
          className={styles.quit}
        >
          QUIT
        </button>
      </div>
    </div>
  );
}
