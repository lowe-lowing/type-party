"use client";
import { useTypeListener } from "@/lib/hooks/useTypeListener";
import { cn } from "@/lib/utils";
import { useState, type FC } from "react";
import { useTimer } from "react-timer-hook";

export interface Letter {
  id: number;
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
      .map((letter, i) => ({ id: i, letter, status: "upcoming" }))
  );
  useTypeListener(letters, setLetters);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 30);
  const { seconds } = useTimer({ expiryTimestamp: time, onExpire: () => console.log("expired") });

  let index = 0;

  return (
    <div className="flex flex-col justify-center">
      <p>{seconds}</p>
      <div className="flex whitespace-pre-wrap max-w-[80vh] flex-wrap">
        {words.map((word, i) => {
          const wordLetters = [...word.split(""), " "].map((letter) => ({ letter, status: "upcoming" }));
          return (
            <div key={i} className="flex">
              {wordLetters.map((l, j) => {
                const lt = letters[index];
                index++;

                return (
                  <div className="relative" key={j}>
                    <div
                      className={cn("w-[1px] h-8 absolute left-0", {
                        "bg-white animate-pulse": lt?.status === "current",
                      })}
                    />
                    <p
                      key={i}
                      className={cn("leading-8 text-gray-500 text-2xl", {
                        "text-green-500": lt?.status === "completed",
                        "text-red-500": lt?.status === "failed",
                      })}
                    >
                      {lt?.letter}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TypingClient;
