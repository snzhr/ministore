import type React from "react";
import styles from "./Loader.module.scss";

type LoaderProps = {
  width?: number;
  height?: number;
  position?: React.CSSProperties["position"];
};

export default function Loader({
  width = 24,
  height = 24,
  position = "initial",
}: LoaderProps) {
  return (
    <div className={styles.loaderWrapper}>
      <span
        className={styles.loader}
        style={{ width, height, position }}
      ></span>
    </div>
  );
}
