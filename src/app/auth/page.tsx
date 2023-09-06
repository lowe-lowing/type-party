import TodoList from "@/components/TodoList";
import { serverClientAuth } from "@/lib/trpc/serverClient";
import Link from "next/link";

// export const runtime = "edge";

export default async function Auth() {
  const user = await serverClientAuth.getUser();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Link href="/">Home</Link>
      {user.name}
    </main>
  );
}
