import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import useChatListener from "@hooks/useChatListener";
import { EmoteDrop } from "@components/EmoteDrop";

const CHAT_COMMANDS = {
  "!test": "This is a test response from your chat command 👍"
};

export default function Scenes() {
  const { connectListener, messages } = useChatListener({
    channels: ["itsaydrian", "chloecondon", "LaRenaiocco"],
    commands: CHAT_COMMANDS
  });
  const router = useRouter();
  const urlRef = useRef(router.pathname);

  useEffect(() => {
    connectListener("on");
    return () => {
      if (urlRef.current !== router.pathname) {
        connectListener("off");
      }
    };
  }, [router.pathname]);

  return (
    <>
      {false && (
        <ul>
          {messages.map((message, idx) => {
            return <li key={idx}>{message.message}</li>;
          })}
        </ul>
      )}
      <EmoteDrop messages={messages} />
    </>
  );
}
