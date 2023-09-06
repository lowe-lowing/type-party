import { todos } from "@/lib/db/schema/todos";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router, routerAuth } from "../trpc";
import { db } from "@/lib/db";

// router withouth auth on the context, uses runtime edge
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
export type AppRouter = typeof appRouter;

// router with auth on the context, not using runtime edge
export const appRouterAuth = routerAuth({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session?.user;
  }),
});

export type AppRouterAuth = typeof appRouterAuth;
