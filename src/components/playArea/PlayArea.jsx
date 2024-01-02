import React, { useEffect, useState } from "react";
import styles from "./playArea.module.css";
import blueCross from "../../assets/blue-cross.svg";
import orangeCircle from "../../assets/orange-circle.svg";
import refreshIcon from "../../assets/refresh.svg";
import RefreshModal from "../refreshModal/RefreshModal";
import { usePlayer } from "../../providers/gameProvider";

const initialArray = Array(9).fill(null); // Initialize an array with null values

function calWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function PlayArea() {
  const [refresh, setRefresh] = useState(false);
  const { playerShape, scores, setScores } = usePlayer();

  const [squares, setSquares] = useState(initialArray);
  const [xIsNext, setXIsNext] = useState(playerShape === "X" ? true : false);

  const handleSelectSquare = (index) => {
    if (squares[index] || calWinner(squares)) {
      return; // Ignore click if square is already filled or game is won
    }
    const newSquares = [...squares];
    newSquares[index] = xIsNext ? "X" : "O";

    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calWinner(squares);

  useEffect(() => {
    setScores(
      JSON.stringify({
        user:
          winner === playerShape
            ? JSON.parse(scores)["user"] + 1
            : JSON.parse(scores)["user"],
        tie:
          !winner && squares.filter((value) => value !== null).length === 9
            ? JSON.parse(scores)["tie"] + 1
            : JSON.parse(scores)["tie"],
        cpu:
          winner === (playerShape === "O" ? "X" : "O")
            ? JSON.parse(scores)["cpu"] + 1
            : JSON.parse(scores)["cpu"],
      })
    );
  }, [winner, squares]);

  return (
    <div className={`${styles.container} `}>
      <div
        className={`${styles.c} ${
          (refresh ||
            winner ||
            squares.filter((value) => value !== null).length === 9) &&
          styles.container_1
        }`}
      >
        <div className={styles.main_container}>
          <div className={styles.topLayer}>
            <div className={styles.svgIcons}>
              <img src={blueCross} alt="X" />
              <img src={orangeCircle} alt="O" />
            </div>

            <div className={styles.turn}>
              <img src={xIsNext ? blueCross : orangeCircle} alt="O" />
              <p>TURN</p>
            </div>

            <div className={styles.refreshIcon}>
              <img src={refreshIcon} alt="" onClick={() => setRefresh(true)} />
            </div>
          </div>

          <div className={styles.gameBox}>
            {squares.map((value, index) => (
              <div
                className={styles.singleBox}
                key={index}
                onClick={() => handleSelectSquare(index)}
              >
                {value &&
                  (value === "X" ? (
                    <img src={blueCross} alt="X" />
                  ) : (
                    <img src={orangeCircle} alt="O" />
                  ))}
              </div>
            ))}
          </div>

          <div className={styles.scores}>
            <div className={styles.myWin}>
              <p className={styles.scoreName}>{playerShape} (YOU)</p>
              <strong>{JSON.parse(scores)["user"]}</strong>
            </div>

            <div className={styles.ties}>
              <p className={styles.scoreName}>TIES</p>
              <strong>{JSON.parse(scores)["tie"]}</strong>
            </div>

            <div className={styles.cpuWin}>
              <p className={styles.scoreName}>
                {playerShape === "O" ? "X" : "O"} (CPU)
              </p>
              <strong>{JSON.parse(scores)["cpu"]}</strong>
            </div>
          </div>
        </div>
      </div>
      {winner && (
        <RefreshModal
          setRefresh={setRefresh}
          textContent={`${winner} TAKES THE ROUND`}
          winner={winner}
          setSquares={setSquares}
          setXIsNext={setXIsNext}
        />
      )}
      {!winner && squares.filter((value) => value !== null).length === 9 && (
        <RefreshModal
          setRefresh={setRefresh}
          textContent={"NICE TRY, REMATCH?"}
          winner={winner}
          setSquares={setSquares}
          setXIsNext={setXIsNext}
        />
      )}
      {refresh && (
        <RefreshModal
          setRefresh={setRefresh}
          textContent={"Do you want to quit?"}
          winner={winner}
          setSquares={setSquares}
          setXIsNext={setXIsNext}
        />
      )}
    </div>
  );
}
