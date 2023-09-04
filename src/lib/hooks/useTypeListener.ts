import { Letter } from "@/components/TypingClient";
import { useEffect, useState } from "react";

export const useTypeListener = (letters: Letter[], setLetters: React.Dispatch<React.SetStateAction<Letter[]>>) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  useEffect(() => {
    const listener = (e: any) => {
      if (currentLetterIndex >= letters.length) {
        console.log("done");
        window.removeEventListener("keydown", listener);
        return;
      }
      if (e.key == "Backspace") {
        setLetters((prev) => {
          const updatedLetters = [...prev];
          updatedLetters[currentLetterIndex - 1].status = "current";
          return updatedLetters;
        });
        setCurrentLetterIndex((prev) => prev - 1);
      } else if (e.key === letters[currentLetterIndex].letter && currentLetterIndex < letters.length) {
        setLetters((prev) => {
          const updatedLetters = [...prev];
          updatedLetters[currentLetterIndex].status = "completed";
          if (currentLetterIndex + 1 < letters.length) {
            updatedLetters[currentLetterIndex + 1].status = "current";
          }
          return updatedLetters;
        });
        setCurrentLetterIndex((prev) => prev + 1);
      } else {
        setLetters((prev) => {
          const updatedLetters = [...prev];
          updatedLetters[currentLetterIndex].status = "failed";
          return updatedLetters;
        });
        setCurrentLetterIndex((prev) => prev + 1);
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [letters, currentLetterIndex]);
};
