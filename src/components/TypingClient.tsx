"use client";
import { useTypeListener } from "@/lib/hooks/useTypeListener";
import { cn } from "@/lib/utils";
import { useState, type FC } from "react";
import { useTimer } from "react-timer-hook";

export interface Letter {
  letter: string;
  status: "completed" | "current" | "upcoming" | "failed";
}

interface TypingClientProps {
  words: string[];
}

const TypingClient: FC<TypingClientProps> = ({ words }) => {
  const [letters, setLetters] = useState<Letter[]>(
    words
      .join(" ")
      .split("")
      .map((letter) => ({ letter, status: "upcoming" }))
  );
  useTypeListener(letters, setLetters);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 30);
  const { seconds } = useTimer({ expiryTimestamp: time, onExpire: () => console.warn("onExpire called") });

  return (
    <div>
      <p>{seconds}</p>
      <div className="flex whitespace-pre-wrap">
        {letters.map((l, i) => (
          <p
            key={i}
            className={cn({
              "text-green-500": l.status === "completed",
              "text-blue-500": l.status === "current",
              "text-gray-500": l.status === "upcoming",
              "text-red-500": l.status === "failed",
            })}
          >
            {l.letter}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TypingClient;
