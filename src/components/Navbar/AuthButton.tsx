"use client";
import { User } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { type FC } from "react";
import { Button } from "../ui/button";

interface AuthButtonProps {
  user: User | undefined;
}

const AuthButton: FC<AuthButtonProps> = ({ user }) => {
  if (user) {
    return (
      <Button variant={"destructive"} onClick={() => signOut()}>
        Sign out
      </Button>
    );
  }
  return <Button onClick={() => signIn()}>Sign In</Button>;
};

export default AuthButton;
