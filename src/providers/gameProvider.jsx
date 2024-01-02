import { createContext, useContext, useEffect, useState } from "react";

const GameContext = createContext();

export const usePlayer = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  // * set player shape
  const [playerShape, setPlayerShape] = useState(
    localStorage.getItem("player") || "O"
  );
  useEffect(() => {
    localStorage.setItem("player", playerShape);
  }, [playerShape]);

  // * start a new game
  let [startNewGame, setStartNewGame] = useState(
    localStorage.getItem("startNewGame") || false
  );
  useEffect(() => {
    localStorage.setItem("startNewGame", startNewGame);
  }, [startNewGame]);

  // * set scores
  const [scores, setScores] = useState(
    localStorage.getItem("scores") ||
      JSON.stringify({ user: 0, tie: 0, cpu: 0 })
  );
  useEffect(() => {
    localStorage.setItem("scores", scores);
  }, [scores]);

  return (
    <GameContext.Provider
      value={{
        playerShape,
        setPlayerShape,
        startNewGame,
        setStartNewGame,
        scores,
        setScores,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
