"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSocket } from "../providers/SocketProvider";

const SocketTester = () => {
  const { socket } = useSocket();
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("msg", (message: string) => {
      console.log("message", message);
    });

    return () => {
      socket.off("msg");
    };
  }, [socket]);

  const [input, setInput] = useState("");

  const onChangeHandler = async (e: any) => {
    setInput(e.target.value);
    await axios.post("/api/socket/emit", { channel: "msg", message: e.target.value });
  };

  return <input placeholder="Type something" value={input} onChange={onChangeHandler} />;
};

export default SocketTester;
