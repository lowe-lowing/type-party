import { eq } from "drizzle-orm";
import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { todos } from "@/lib/db/schema";

import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { pusherRouter } from "./routers/pusher";

const db = drizzle(sql);

export const appRouter = router({
  pusher: pusherRouter,
  getTodos: publicProcedure.query(async () => {
    return db.select().from(todos).orderBy(todos.id);
  }),
  addTodo: publicProcedure.input(z.string()).mutation(async (opts) => {
    return db.insert(todos).values({ content: opts.input });
  }),
  setDone: publicProcedure
    .input(
      z.object({
        id: z.number(),
        done: z.boolean(),
      })
    )
    .mutation(async (opts) => {
      return db.update(todos).set({ done: opts.input.done }).where(eq(todos.id, opts.input.id));
    }),
});

export type AppRouter = typeof appRouter;
