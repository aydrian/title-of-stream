import { useEffect } from "react";
import { useEmote } from "@hooks/useEmote";

export function EmoteDrop({
  messages,
  filter = [],
  canvas = { height: 720, width: 1280 }
}) {
  const { emoteRef, addEmote } = useEmote();

  useEffect(() => {
    const [message] = messages.slice(-1);
    if (!message) return;

    console.log(message);
    message.emotes.forEach((emote) => {
      if (filter.length === 0 || filter.includes(emote.name)) {
        emote.locations.forEach(() => addEmote(emote.images.large));
      }
    });
  }, [messages.length]);

  return (
    <canvas
      ref={emoteRef}
      style={{
        height: canvas.height,
        left: 0,
        position: "absolute",
        top: 0,
        width: canvas.width
      }}
    />
  );
}
