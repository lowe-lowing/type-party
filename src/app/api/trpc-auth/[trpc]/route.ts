import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/lib/trpc/server/router/_app";
import { createContext } from "@/lib/trpc/context";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpcAuth",
    req,
    router: appRouter,
    createContext,
  });

export { handler as GET, handler as POST };
