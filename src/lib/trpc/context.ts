import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { AnyRouter } from "@trpc/server";
import { TRPCLink, httpBatchLink } from "@trpc/client";
import { getUrl } from "./utils";
import { getUserAuth } from "../auth";

export async function createContext(opts?: FetchCreateContextFnOptions) {
  const { session } = await getUserAuth();

  return {
    session: session,
    headers: opts && Object.fromEntries(opts.req.headers),
  };
}
type FullContext = Awaited<ReturnType<typeof createContext>> & {
  links?: TRPCLink<AnyRouter>[];
};

export type Context = Partial<FullContext>;
