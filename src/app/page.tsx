import { serverClient } from "./_trpc/serverClient";
import TodoList from "@/components/TodoList";
import Link from "next/link";

export const runtime = "edge";

export default async function Home() {
  const todos = await serverClient.getTodos();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Link href="/party">Party</Link>
      <TodoList initialTodos={todos} />
    </main>
  );
}
// import ThemeToggle from "../components/ThemeToggle";

// export default function Home() {
//   return (
//     <div className="w-full container p-4 mx-auto">
//       <div className="py-20 flex flex-col items-center justify-center">
//         <h1 className="text-5xl text-center font-bold">Next Themes + Tailwind Dark Mode</h1>
//         <p className="italic text-2xl">with app-dir</p>

//         <ThemeToggle />
//       </div>
//     </div>
//   );
// }
