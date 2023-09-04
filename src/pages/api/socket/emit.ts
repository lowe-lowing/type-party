import { NextApiRequest } from "next";

import { NextApiResponseServerIo } from "@/types";

const emit = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  const { channel, message } = req.body;
  res?.socket?.server?.io?.emit(channel, message);

  res.end();
};

export default emit;
