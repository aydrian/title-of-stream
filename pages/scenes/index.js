import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import useChatListener from "@hooks/useChatListener";
import { Overlays } from "@components/Overlays";
import { LowerThird } from "@components/LowerThird";

import styles from "@styles/scenes.module.css";

export default function Scenes() {
  const { connectListener, messages } = useChatListener({
    channels: ["itsaydrian", "chloecondon", "LaRenaiocco"]
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
    <main className={styles.overlay}>
      <div />
      <Overlays messages={messages} />
      <LowerThird messages={messages} />
    </main>
  );
}
