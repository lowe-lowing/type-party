import { type FC } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

interface GameFinishedProps {
  player1Score: number;
  player2Score: number;
}

const GameFinished: FC<GameFinishedProps> = ({ player1Score, player2Score }) => {
  const whoWon = player1Score > player2Score ? "Player 1" : "Player 2";
  const router = useRouter();
  const location = usePathname();

  return (
    <div className="w-full flex h-full flex-col items-center justify-center">
      <p className="w-fit">Game Finished</p>
      <p className="w-fit">{whoWon} won the game</p>

      <div className="grid w-full h-[50%]" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <p>Player 1</p>
          wpm: {player1Score}
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <p>Player 2</p>
          wpm: {player2Score}
        </div>
      </div>
      <p>Refresh the page to play again</p>
      {/* <Button
        onClick={() => {
          
        }}
        className="w-fit"
      >
        Play again
      </Button> */}
    </div>
  );
};

export default GameFinished;
