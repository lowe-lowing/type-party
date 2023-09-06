import { createTRPCReact } from "@trpc/react-query";

import { AppRouterAuth, type AppRouter } from "@/lib/trpc/server/router/_app";

export const trpc = createTRPCReact<AppRouter>();
export const trpcAuth = createTRPCReact<AppRouterAuth>();
