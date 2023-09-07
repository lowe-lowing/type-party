import TodoList from "@/components/TodoList";
import { serverClient } from "@/lib/trpc/serverClient";
import Link from "next/link";

export default async function Todos() {
  const todos = await serverClient.getTodos();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Link href="/party">Party</Link>
      <TodoList initialTodos={todos} />
    </main>
  );
}
