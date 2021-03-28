import { useEffect, useState } from "react";
import tmi from "tmi.js";
import {
  getMessageHTML,
  parseAuthor,
  parseCommand,
  parseEmotes
} from "@utils/parse-twitch-chat";

/*
  Use this to acquire custom tokens for the webhooks
  https://twitchtokengenerator.com/
*/

export default function useChatListener({ channels }) {
  const [messages, setMessages] = useState([]);

  const client = new tmi.Client({
    connection: {
      secure: true,
      reconnect: true
    },
    channels,
    identity: {
      username: process.env.NEXT_PUBLIC_TWITCH_CHANNEL,
      password: process.env.NEXT_PUBLIC_TWITCH_AUTH_TOKEN
    }
  });

  function connectListener(value) {
    if (value === "on") {
      console.log("Turning on the chat client");
      return client.connect();
    } else if (value === "off") {
      console.log("Turning off the chat client");
      return client.disconnect();
    }
  }

  useEffect(() => {
    client.on("message", async (channel, tags, msg, self) => {
      // don’t process messages sent by the chatbot to avoid loops
      if (self) return;

      if (tags["message-type"] === "whisper") {
        // we don’t handle whispers
        return;
      }

      // chat activity always includes author and emote data
      const time = new Date(parseInt(tags["tmi-sent-ts"]));

      const message = {
        channel: channel.replace("#", ""),
        message: msg,
        author: parseAuthor(channel, tags),
        emotes: parseEmotes(msg, tags.emotes),
        time,
        id: tags.id
      };

      if (msg.match(/^(!|--)/)) {
        const { command, args } = parseCommand(msg);

        message.command = command;
        message.args = args;
      } else {
        message.html = getMessageHTML(msg, message.emotes);
      }

      return setMessages((prev) => [...prev, message]);
    });
  }, []);

  return {
    connectListener,
    messages
  };
}
