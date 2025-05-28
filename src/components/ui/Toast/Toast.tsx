import styles from "./Toast.module.scss";

type ToastProps = {
  visible: boolean;
  message: string;
  type: "primary" | "success" | "danger" | "warning";
};

function Toast({ message, type, visible }: ToastProps) {
  return (
    <div
      className={`${styles.toast} ${styles[type]} ${visible ? styles.visible : ""}`}
    >
      <div>{message}</div>
    </div>
  );
}

export default Toast;
