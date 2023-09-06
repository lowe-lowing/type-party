import { TRPCError, initTRPC } from "@trpc/server";
import SuperJSON from "superjson";

import { type Context } from "../context";

const t = initTRPC.create({
  transformer: SuperJSON,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

const tAuth = initTRPC.context<Context>().create({
  transformer: SuperJSON,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const routerAuth = t.router;

const isAuthed = tAuth.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = tAuth.procedure.use(isAuthed);
