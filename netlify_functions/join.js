exports.handler = async ({ httpMethod, path, queryStringParameters }) => {
  if (httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  const [, , guest, device = "cam"] = path.split("/");
  const { pwd } = queryStringParameters;
  const host = auth(guest, pwd);

  if (!host) {
    return {
      statusCode: 403,
      body: "Forbidden"
    };
  }

  let base_url = `https://obs.ninja/?r=${process.env.OBSN_ROOM}&pw=${process.env.OBSN_ROOM_PWD}&push=${host[device]}&np&broadcast&q=0`;
  if (device === "cam") {
    base_url += `&webcam`;
  } else if (device === "screen") {
    base_url += `&screenshare&nv&na`;
  } else {
    return {
      statusCode: 401,
      body: "Not a valid device"
    };
  }

  return {
    statusCode: 302,
    headers: {
      Location: base_url
    }
  };
};

const hosts = {
  chloe: {
    pwd: process.env.CHLOE_PWD,
    cam: "ChloeCamera",
    screen: "ChloeScreen"
  },
  larena: {
    pwd: process.env.LARENA_PWD,
    cam: "LaRenaCamera",
    screen: "LaRenaScreen"
  },
  guest: {
    pwd: process.env.GUEST_PWD,
    cam: "GuestCamera",
    screen: "GuestScreen"
  }
};

const auth = (guest, pwd) => {
  guest = guest.toLowerCase();
  if (!pwd || !["aydrian", "chloe", "larena", "guest"].includes(guest)) {
    return false;
  }

  if (hosts[guest] && hosts[guest].pwd === pwd) {
    return hosts[guest];
  }

  return false;
};
