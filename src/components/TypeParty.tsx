"use client";
import { PusherEvent, usePusher } from "@/hooks/usePusher";
import { useSearchParams } from "next/navigation";
import { generate } from "random-words";
import { useState, type FC } from "react";
import ConnectedIndicator from "./ConnectedIndicator";
import GameStarting from "./GameStarting";
import { Button } from "./ui/button";
import { TriggerPayload } from "@/app/api/pusher/route";
import axios from "axios";

interface TypePartyProps {}

const TypeParty: FC<TypePartyProps> = ({}) => {
  const searchParams = useSearchParams();
  const player = searchParams?.get("player");

  const [player1Ready, setPlayer1Ready] = useState(false);
  const [player2Ready, setPlayer2Ready] = useState(false);

  const [gameStarted, setGameStarted] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const { connected } = usePusher("game", [
    {
      event: "ready_up",
      func: (player) => {
        if (parseInt(player) === 1) {
          setPlayer1Ready(true);
        } else if (parseInt(player) === 2) {
          setPlayer2Ready(true);
        }
      },
    } as PusherEvent<string>,
    {
      event: "start_game",
      func: (data) => {
        setData(data);
        setGameStarted(true);
      },
    } as PusherEvent<string[]>,
  ]);

  const readyUp = () => {
    axios.post("/api/pusher", { channel: "game", event: "ready_up", data: player } as TriggerPayload);
  };

  const startGame = async () => {
    const data = generate(50);
    axios.post("/api/pusher", { channel: "game", event: "start_game", data } as TriggerPayload);
  };

  if (gameStarted) {
    return <GameStarting data={data} />;
  }

  return (
    <div className="w-full flex h-full flex-col items-center justify-center">
      <div className="w-fit">
        <ConnectedIndicator connected={connected} />
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
