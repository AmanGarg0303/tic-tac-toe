import React from "react";
import styles from "./homeScreenContent.module.css";
import blueCross from "../../assets/blue-cross.svg";
import orangeCircle from "../../assets/orange-circle.svg";
import { usePlayer } from "../../providers/gameProvider";
import toast from "react-hot-toast";

export default function HomeScreenContent() {
  const { playerShape, setPlayerShape, setStartNewGame } = usePlayer();

  const handleInviteFriend = () => {
    navigator.clipboard.writeText(window.location.href);

    toast.success("Invite Link Copied", {
      style: {
        padding: "10px",
        color: "#f2b237",
        backgroundColor: "#192b33",
        fontWeight: 700,
      },
      iconTheme: {
        primary: "#f2b237",
        secondary: "#192b33",
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.svgIcons}>
        <img src={blueCross} alt="X" />
        <img src={orangeCircle} alt="O" />
      </div>

      <div className={styles.choose_player}>
        <h5>Pick Player</h5>
        <div className={styles.svgIconsChoose}>
          <div
            className={`${playerShape === "X" && styles.selected} ${
              styles.iconSpace
            }`}
            onClick={() => setPlayerShape("X")}
          >
            <img src={blueCross} alt="X" />
          </div>
          <div
            className={`${playerShape === "O" && styles.selected} ${
              styles.iconSpace
            }`}
            onClick={() => setPlayerShape("O")}
          >
            <img src={orangeCircle} alt="O" sizes={10} />
          </div>
        </div>
      </div>

      <div
        className={`${styles.newGame} ${styles.cpu}`}
        onClick={() => setStartNewGame(true)}
      >
        <button>NEW GAME (VS CPU)</button>
      </div>

      <div className={`${styles.newGame} ${styles.human}`}>
        <button>NEW GAME (VS HUMAN) Coming Soon</button>
      </div>

      <div className={styles.invite} onClick={handleInviteFriend}>
        <button>Invite your friend</button>
      </div>
    </div>
  );
}
