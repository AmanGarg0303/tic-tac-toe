import React from "react";
import styles from "./homeScreen.module.css";
import HomeScreenContent from "../homeScreenContent/HomeScreenContent";
import PlayArea from "../playArea/PlayArea";
import { usePlayer } from "../../providers/gameProvider";
import PlayAreaBox from "../playAreaBox/PlayAreaBox";

export default function HomeScreen() {
  const { startNewGame } = usePlayer();

  return (
    <div className={styles.container}>
      {JSON.parse(startNewGame) === true ? (
        <PlayAreaBox />
      ) : (
        <HomeScreenContent />
      )}
    </div>
  );
}
