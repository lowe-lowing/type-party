import SocketTester from "@/components/SocketTesting/SocketTester";
import { serverClient } from "./_trpc/serverClient";
import TodoList from "@/components/TodoList";
import Link from "next/link";
import { SocketIndicator } from "@/components/SocketTesting/SocketIndicator";

// export const runtime = "edge";

export default async function Home() {
  const todos = await serverClient.getTodos();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Link href="/party">Party</Link>
      <SocketIndicator />
      <SocketTester />
      <TodoList initialTodos={todos} />
    </main>
  );
}
