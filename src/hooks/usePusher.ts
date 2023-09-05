import Pusher from "pusher-js";
import { useEffect, useState } from "react";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
});
export type PusherEvent<T> = {
  event: string;
  func: (data: T) => void;
};

type Events = {
  event: string;
  func: (data: any) => void;
}[];

export function usePusher(channel: string, events: Events) {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const chann = pusher.channel(channel) || pusher.subscribe(channel);

    events.forEach((e) => {
      chann.bind(e.event, e.func);
    });

    chann.bind("pusher:subscription_succeeded", function () {
      setConnected(true);
    });

    chann.bind("pusher:subscription_error", function () {
      setConnected(false);
    });

    return () => {
      pusher.unsubscribe(channel);
    };
  }, []);

  return { connected };
}
