import React, { useEffect, useState } from "react";
import styles from "./quote.module.css";
import icon from "../../assets/quote-api-dots.svg";
import axios from "axios";

export default function Quote() {
  const [quote, setQuote] = useState({});

  const fetchQuote = async () => {
    try {
      const res = await axios.get("https://api.adviceslip.com/advice");
      setQuote(res.data?.slip);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuote();

    const intervalId = setInterval(() => {
      fetchQuote();
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (!quote?.advice) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Quote #{quote?.id}</h2>

      <p className={styles.quote}>"{quote.advice}"</p>

      <div className={styles.quoteIconCircle}>
        <img src={icon} alt="" />
      </div>
    </div>
  );
}
