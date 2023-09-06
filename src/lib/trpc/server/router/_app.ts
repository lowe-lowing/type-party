import { todos } from "@/lib/db/schema/todos";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { db } from "@/lib/db";

export const appRouter = router({
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

export const appRouterAuth = router({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session?.user;
  }),
});

export type AppRouter = typeof appRouter;
