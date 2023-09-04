"use client";
import { useState, type FC } from "react";
import { useTimer } from "react-timer-hook";
import TypingClient from "./TypingClient";

interface GameStartingProps {
  data: string[];
}

const GameStarting: FC<GameStartingProps> = ({ data }) => {
  const [gameStarted, setGameStarted] = useState(false);

  const starting = new Date();
  starting.setSeconds(starting.getSeconds() + 3);
  const { seconds: startingCountDown } = useTimer({
    expiryTimestamp: starting,
    onExpire: () => setGameStarted(true),
  });

  if (!gameStarted) {
    return <div className="grid place-items-center text-5xl">{startingCountDown}</div>;
  }
  return <TypingClient words={data} />;
};

export default GameStarting;
