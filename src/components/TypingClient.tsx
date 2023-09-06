"use client";
import { useTypeListener } from "@/hooks/useTypeListener";
import { cn } from "@/lib/utils";
import { useState, type FC } from "react";
import { useTimer } from "react-timer-hook";
import GameFinished from "./GameFinished";
import { PusherEvent, usePusher } from "@/hooks/usePusher";
import { trpc } from "@/lib/trpc/client";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { TriggerPayload } from "@/app/api/pusher/route";

type Letter = {
  letter: string;
  status: "completed" | "current" | "upcoming" | "failed";
};

type Word = {
  status: "completed" | "uncompleted" | "failed";
  letters: Letter[];
};
export type Words = Word[];

type GameFinishedData = {
  player: number;
  score: number;
};

interface TypingClientProps {
  words: string[];
}

const TypingClient: FC<TypingClientProps> = ({ words }) => {
  const [wordsState, setWordsState] = useState<Words>(
    words.map((word) => ({
      status: "uncompleted",
      letters: [...word.split(""), " "].map((letter) => ({ letter, status: "upcoming" })),
    }))
  );
  useTypeListener(wordsState, setWordsState);

  const searchParams = useSearchParams();
  const player = searchParams?.get("player") as string;

  const [gameFinished, setGameFinished] = useState(false);
  const [player1Score, setPlayer1Score] = useState<number | null>(null);
  const [player2Score, setPlayer2Score] = useState<number | null>(null);

  usePusher("game", [
    {
      event: "game_finished",
      func: (data) => {
        if (data.player === 1) {
          setPlayer1Score(data.score);
        }
        if (data.player === 2) {
          setPlayer2Score(data.score);
        }
      },
    } as PusherEvent<GameFinishedData>,
  ]);

  // const { mutateAsync: trigger } = trpc.pusher.trigger.useMutation();
  const extractWPM = () => {
    const completedWords = wordsState.filter((word) => {
      const removeLastLetter = word.letters.slice(0, -1);
      console.log(removeLastLetter);

      const completedLetters = removeLastLetter.filter((letter) => letter.status === "completed");
      return completedLetters.length === word.letters.length - 1;
    });
    // förutsatt att antal sekunder är 30
    const wpm = completedWords.length * 2;
    return wpm;
  };

  const endGame = async () => {
    const score = extractWPM();
    axios.post("/api/pusher", {
      channel: "game",
      event: "game_finished",
      data: {
        player: parseInt(player),
        score,
      } as GameFinishedData,
    } as TriggerPayload);
    // await trigger({
    //   channel: "game",
    //   event: "game_finished",
    //   data: {
    //     player: parseInt(player),
    //     score,
    //   } as GameFinishedData,
    // });
    setGameFinished(true);
  };

  const time = new Date();
  time.setSeconds(time.getSeconds() + 30);
  const { seconds } = useTimer({ expiryTimestamp: time, onExpire: () => endGame() });

  if (gameFinished && player1Score !== null && player2Score !== null) {
    return <GameFinished player1Score={player1Score} player2Score={player2Score} />;
  }
  return (
    <div className="flex flex-col justify-center">
      <p>{seconds}</p>
      <div className="flex whitespace-pre-wrap max-w-[80vh] flex-wrap">
        {wordsState.map((word, i) => {
          return (
            <div key={i} className="flex">
              {word.letters.map((l, j) => {
                return (
                  <div className="relative" key={j}>
                    <div
                      className={cn("w-[1px] h-8 absolute left-0", {
                        "bg-white animate-pulse": l?.status === "current",
                      })}
                    />
                    <p
                      key={i}
                      className={cn("leading-8 text-gray-500 text-2xl", {
                        "text-green-500": l?.status === "completed",
                        "text-red-500": l?.status === "failed",
                      })}
                    >
                      {l?.letter}
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
