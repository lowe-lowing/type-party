"use client";
import { User } from "next-auth";
import { signOut, signIn } from "next-auth/react";
import { type FC } from "react";
import { Button } from "../ui/button";
import { trpc, trpcAuth } from "@/lib/trpc/client";

interface AuthButtonProps {
  user: User | undefined;
}

const AuthButton: FC<AuthButtonProps> = ({ user }) => {
  //   const { data } = trpcAuth.getUser.useQuery(undefined, {
  //     initialData: user,
  //   });
  if (user) {
    // console.log(user);

    return (
      <Button variant={"destructive"} onClick={() => signOut()}>
        Sign out
      </Button>
      //   <div>
      //     {user.name}
      //   </div>
    );
  }
  return <Button onClick={() => signIn()}>Sign In</Button>;
};

export default AuthButton;
