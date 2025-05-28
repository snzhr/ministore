import Loader from "../Loader/Loader";
import styles from "./Button.module.scss";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "success" | "danger" | "secondary";
  disabled?: boolean;
};

function Button({ label, onClick, disabled, loading, type="button", variant="primary" }: ButtonProps) {
  return (
    <button disabled={disabled} className={`${styles.button} ${styles[variant]}`} type={type} onClick={onClick}>
      {label}
      {loading && <Loader />}
    </button>
  );
}

export default Button;
