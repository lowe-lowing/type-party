import { router, publicProcedure } from "../trpc";
import Pusher from "pusher";
import { z } from "zod";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
});

export type UpdateUiPusherResponse = {
  userId: string;
};

export const pusherRouter = router({
  trigger: publicProcedure
    .input(z.object({ channel: z.string(), event: z.string(), data: z.any() }))
    .mutation(({ ctx, input }) => {
      const { channel, event, data } = input;
      return pusher.trigger(channel, event, data);
    }),
});
