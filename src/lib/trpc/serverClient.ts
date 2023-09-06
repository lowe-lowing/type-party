import { appRouter, appRouterAuth } from "@/lib/trpc/server/router/_app";
import { httpBatchLink } from "@trpc/client";
import { getUrl, getUrlAuth } from "./utils";

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: getUrl(),
    }),
  ],
});

export const serverClientAuth = appRouterAuth.createCaller({
  links: [
    httpBatchLink({
      url: getUrlAuth(),
    }),
  ],
});
