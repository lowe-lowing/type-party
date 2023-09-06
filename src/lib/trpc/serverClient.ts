import { appRouter } from "@/lib/trpc/server/router/_app";
import { httpBatchLink } from "@trpc/client";
import { getUrl } from "./utils";

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: getUrl(),
    }),
  ],
});
