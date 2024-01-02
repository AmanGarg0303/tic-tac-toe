import React from "react";
import styles from "./home.module.css";
import Quote from "../../components/quote/Quote";
import HomeScreen from "../../components/homeScreen/HomeScreen";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.quoteArea}>
        <Quote />
      </div>
      <HomeScreen />
    </div>
  );
}
