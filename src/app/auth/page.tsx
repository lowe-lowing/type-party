import { serverClientAuth } from "@/lib/trpc/serverClient";
import Link from "next/link";

// export const runtime = "edge";

const getUser = async () => {
  try {
    const user = await serverClientAuth.getUser();
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function Auth() {
  const user = await getUser();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Link href="/">Home</Link>
      {user ? user.name : "Not logged in"}
    </main>
  );
}
