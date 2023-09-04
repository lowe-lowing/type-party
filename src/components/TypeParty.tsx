import { type FC } from "react";
import TypingClient from "@/components/TypingClient";
import { generate } from "random-words";

interface TypePartyProps {}

const TypeParty: FC<TypePartyProps> = async ({}) => {
  const data = generate(10);

  return <TypingClient words={data} />;
};

export default TypeParty;
