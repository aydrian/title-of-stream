import { useEffect } from "react";
import { useEmote } from "@hooks/useEmote";

export function EmoteDrop({ messages }) {
  const { emoteRef, addEmote } = useEmote();

  useEffect(() => {
    const [message] = messages.slice(-1);
    if (!message) return;

    console.log(message);
    message.emotes.forEach((emote) => {
      emote.locations.forEach(() => addEmote(emote.images.large));
    });
  }, [messages.length]);

  return (
    <canvas
      ref={emoteRef}
      style={{
        height: 1080,
        left: 0,
        position: "absolute",
        top: 0,
        width: 1920
      }}
    />
  );
}
