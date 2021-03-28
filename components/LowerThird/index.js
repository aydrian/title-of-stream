import { Chat } from "@components/Chat";
import styles from "./LowerThird.module.css";

export function LowerThird({ messages }) {
  return (
    <div className={styles["lower-third"]}>
      <div className={styles.title}>[title of stream]</div>
      <div />
      <Chat messages={messages} />
    </div>
  );
}
