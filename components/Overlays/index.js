import { EmoteDrop } from "@components/EmoteDrop";

import styles from "./Overlays.module.css";

export function Overlays({ messages }) {
  return (
    <div className={styles.overlays}>
      <EmoteDrop messages={messages} canvas={{ height: 580, width: 1280 }} />
    </div>
  );
}
