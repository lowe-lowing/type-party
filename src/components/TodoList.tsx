"use client";
import { useState } from "react";

import { trpc } from "../lib/trpc/client";
import { serverClient } from "../lib/trpc/serverClient";

export default function TodoList({
  initialTodos,
}: {
  initialTodos: Awaited<ReturnType<(typeof serverClient)["getTodos"]>>;
}) {
  const getTodos = trpc.getTodos.useQuery(undefined, {
    initialData: initialTodos,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const setDone = trpc.setDone.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  const [content, setContent] = useState("");

  return (
    <div>
      <div className="my-5 text-3xl">
        {getTodos?.data?.map((todo) => (
          <div key={todo.id} className="flex gap-3 items-center">
            <input
              id={`check-${todo.id}`}
              type="checkbox"
              checked={!!todo.done}
              style={{ zoom: 1.5 }}
              onChange={async () => {
                const startTime = performance.now();

                await setDone.mutateAsync({
                  id: todo.id,
                  done: !todo.done,
                });

                const endTime = performance.now();
                const duration = endTime - startTime;
                console.log(`Mutation took ${duration} milliseconds`);
              }}
            />
            <label htmlFor={`check-${todo.id}`}>{todo.content}</label>
          </div>
        ))}
      </div>
      <div className="flex gap-3 items-center">
        <label htmlFor="content">Content</label>
        <input
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-grow text-black bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2"
        />
        <button
          onClick={async () => {
            if (content.length) {
              const startTime = performance.now();

              await addTodo.mutateAsync(content);
              setContent("");

              const endTime = performance.now();
              const duration = endTime - startTime;
              console.log(`Mutation took ${duration} milliseconds`);
            }
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}
