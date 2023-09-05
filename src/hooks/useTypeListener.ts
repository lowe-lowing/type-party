import { Words } from "@/components/TypingClient";
import { useEffect, useState } from "react";

export const useTypeListener = (words: Words, setWords: React.Dispatch<React.SetStateAction<Words>>) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      // Extract all letters from all words
      const allLetters = words.flatMap((word) => word.letters);

      if (currentLetterIndex > allLetters.length) {
        // All letters have been completed
        console.log("done");
        window.removeEventListener("keydown", listener);
        return;
      }

      // Get the current letter
      const currentLetter = allLetters[currentLetterIndex];

      if (e.key === "Backspace") {
        setWords((prev) => {
          const updatedWords = [...prev];
          // Find the current word and letter
          const currentWord = updatedWords.find((word) => word.letters.includes(currentLetter));
          if (currentWord) {
            const letterIndex = currentWord.letters.findIndex((letter) => letter === currentLetter);
            // Update previous and current letters
            if (letterIndex > 0) {
              const previousLetter = currentWord.letters[letterIndex - 1];
              previousLetter.status = "current";
            }
            currentLetter.status = "upcoming";
          }
          return updatedWords;
        });
        setCurrentLetterIndex((prevIndex) => prevIndex - 1);
      } else {
        setWords((prev) => {
          const updatedWords = [...prev];
          // Find the current word and letter
          const currentWord = updatedWords.find((word) => word.letters.includes(currentLetter));
          if (currentWord) {
            // Update current letter based on user input
            currentLetter.status = e.key === currentLetter.letter ? "completed" : "failed";

            // Move to the next letter
            const letterIndex = currentWord.letters.findIndex((letter) => letter === currentLetter);
            if (letterIndex < currentWord.letters.length - 1) {
              const nextLetter = currentWord.letters[letterIndex + 1];
              nextLetter.status = "current";
            }

            // Increment the letter index
            setCurrentLetterIndex((prevIndex) => prevIndex + 1);
          }
          return updatedWords;
        });
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [words, currentLetterIndex, setWords]);

  return currentLetterIndex;
};
// setCurrentLetterIndex((prev) => prev - 1);
// setCurrentLetterIndex((prev) => prev + 1);

// setLetters((prev) => {
// const updatedLetters = [...prev];
// updatedLetters[currentLetterIndex - 1].status = "current";
// updatedLetters[currentLetterIndex].status = "upcoming";
// return updatedLetters;
// });
// setLetters((prev) => {
// const updatedLetters = [...prev];
// updatedLetters[currentLetterIndex].status =
//   e.key === letters[currentLetterIndex].letter && currentLetterIndex < letters.length
//     ? "completed"
//     : "failed";
// if (currentLetterIndex + 1 < letters.length) {
//   updatedLetters[currentLetterIndex + 1].status = "current";
// }
// return updatedLetters;
// });
