import { useEffect, useState } from "react";
import tmi from "tmi.js";

/*

  Use this to acquire custom tokens for the webhooks
  https://twitchtokengenerator.com/

*/

export default function useChatListener({ channels, commands = {} }) {
  const [messages, setMessages] = useState([]);
  const [command, setCommand] = useState();

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
    client.on("chat", async (channel, tags, message, self) => {
      let emotes = [];
      if (tags.emotes) {
        emotes = parseEmotes(tags.emotes, message);
      }

      if (message.match(/^(!|--)/)) {
        const [command] = message.split(" ");
        const commandResult = commands[command.toLowerCase()];

        if (!commandResult) {
          return;
        }

        setMessages((prev) => [
          ...prev,
          { text: message, user: tags.username }
        ]);

        await client.say(channel, commandResult);

        return setCommand(message);
      }

      return setMessages((prev) => [
        ...prev,
        { message, user: tags.username, emotes }
      ]);
    });
  }, []);

  return {
    connectListener,
    messages,
    command
  };
}

/*
{
    "305912719": [
        "5-14",
        "21-30",
        "37-46"
    ]
}

[
  {
    name: "FortOne",
    locations: [[10, 16]],
    images: {
      small: "https://static-cdn.jtvnw.net/emoticons/v1/822112/1.0",
      medium: "https://static-cdn.jtvnw.net/emoticons/v1/822112/2.0",
      large: "https://static-cdn.jtvnw.net/emoticons/v1/822112/3.0"
    }
  }
]
*/
const parseEmotes = (emotes, message) => {
  const newEmotes = Object.entries(emotes).map(([key, value]) => {
    let emote = {
      locations: value.map((location) => {
        const [start, end] = location.split("-");
        return [parseInt(start, 10), parseInt(end, 10) + 1];
      }),
      images: {
        small: `https://static-cdn.jtvnw.net/emoticons/v1/${key}/1.0`,
        medium: `https://static-cdn.jtvnw.net/emoticons/v1/${key}/2.0`,
        large: `https://static-cdn.jtvnw.net/emoticons/v1/${key}/3.0`
      }
    };
    const [start, end] = emote.locations[0];
    emote.name = message.slice(start, end);
    return emote;
  });
  return newEmotes;
};
