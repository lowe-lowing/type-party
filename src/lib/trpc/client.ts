import { createTRPCReact } from "@trpc/react-query";

import { type AppRouter } from "@/lib/trpc/server/router/_app";

export const trpc = createTRPCReact<AppRouter>();
