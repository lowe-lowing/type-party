// "use client";
import { serverClientAuth } from "@/lib/trpc/serverClient";
import Link from "next/link";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import AuthButton from "./AuthButton";
import { getBaseUrl } from "@/lib/trpc/utils";
import { getServerSession } from "next-auth";
import { authOptions, getUserAuth } from "@/lib/auth";

// export const runtime = "edge";

// const getUser = async () => {
//   const res = await fetch(`${getBaseUrl()}/api/auth/user`, { cache: "no-store" });
//   const json = await res.json();
//   console.log(json);

//   return json.user;
// };

export default async function NavbarAuth() {
  //   const user = await getUser();
  const { session } = await getUserAuth();
  console.log(session?.user);

  //   const { data: session, status } = useSession();

  //   if (status === "loading") return <div>Loading...</div>;

  //   if (session) {
  //     return (
  //       <div>
  //         {session.user.name}
  //         <Button variant={"destructive"} onClick={() => signOut()}>
  //           Sign out
  //         </Button>
  //       </div>
  //     );
  //   }
  //   return <Button onClick={() => signIn()}>Sign in</Button>;

  if (session?.user) {
    return (
      <div className="flex gap-1 items-center">
        {session?.user.name}
        <AuthButton user={session?.user} />
      </div>
    );
  }
  return <AuthButton user={session?.user} />;
}
