"use client";
import { useEffect, type FC, useState } from "react";
import TypingClient from "@/components/TypingClient";
import { generate } from "random-words";
import { useSocket } from "./providers/SocketProvider";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import { SocketIndicator } from "./SocketTesting/SocketIndicator";
import axios from "axios";
import GameStarting from "./GameStarting";

interface TypePartyProps {}

const TypeParty: FC<TypePartyProps> = ({}) => {
  const searchParams = useSearchParams();
  const player = searchParams?.get("player");

  const [player1Ready, setPlayer1Ready] = useState(false);
  const [player2Ready, setPlayer2Ready] = useState(false);

  const [gameStarted, setGameStarted] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const { socket } = useSocket();
  useEffect(() => {
    if (!socket || !player) {
      return;
    }

    socket.on("ready_up", (player: string) => {
      if (parseInt(player) === 1) {
        setPlayer1Ready(true);
      } else if (parseInt(player) === 2) {
        setPlayer2Ready(true);
      }
    });

    socket.on("start_game", (data: string[]) => {
      setData(data);
      setGameStarted(true);
    });

    return () => {
      socket.off("ready_up");
    };
  }, [socket, player]);

  const readyUp = () => {
    axios.post("/api/socket/emit", { channel: "ready_up", message: player });
  };

  const startGame = async () => {
    const data = generate(50);
    await axios.post("/api/socket/emit", { channel: "start_game", message: data });
  };

  if (gameStarted) {
    return <GameStarting data={data} />;
  }

  return (
    <div className="w-full flex h-full flex-col items-center justify-center">
      <div className="w-fit">
        <SocketIndicator />
      </div>
      <div className="grid w-full h-[50%]" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <p>Player 1</p>
          {player === "1" ? (
            player1Ready ? (
              "Ready"
            ) : (
              <Button onClick={readyUp}>Ready up</Button>
            )
          ) : (
            <p>{player1Ready ? "Ready" : "Not ready"}</p>
          )}
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <p>Player 2</p>
          {player === "2" ? (
            player2Ready ? (
              "Ready"
            ) : (
              <Button onClick={readyUp}>Ready up</Button>
            )
          ) : (
            <p>{player2Ready ? "Ready" : "Not ready"}</p>
          )}
        </div>
      </div>
      {player && (
        <Button
          onClick={startGame}
          className="w-fit"
          disabled={parseInt(player) === 2 || !player1Ready || !player2Ready}
        >
          Start game
        </Button>
      )}
    </div>
  );
};

export default TypeParty;

// display a connected indicator for player 1 and player 2
// when both players are connected, display a start button for player 1
// run a function that creates the words for the game, and sends them to both clients via socket

// const data = generate(50);

// return <TypingClient words={data} />;

// Get the query parameter from the URL
