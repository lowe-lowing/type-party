import { serverClient } from "../lib/trpc/serverClient";
import TodoList from "@/components/TodoList";
import Link from "next/link";

// export const runtime = "edge";

export default async function Home() {
  const todos = await serverClient.getTodos();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Link href="/party">Party</Link>
      <TodoList initialTodos={todos} />
    </main>
  );
}
