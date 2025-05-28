import { createContext, useState, type ReactNode } from "react";
import Toast from "../components/ui/Toast/Toast";

export type ToastType = {
  message: string;
  type: "success" | "danger" | "warning" | "primary";
};

type ToastContextType = {
  showToast: (toastType: ToastType) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);

function ToastProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [toast, setToast] = useState<ToastType>({});

  const showToast = ({ message, type }: ToastType) => {
    setToast({ message, type });
    setVisible(true);

    let timeoutId = setTimeout(() => {
      setVisible(false);
      clearTimeout(timeoutId);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {visible && <Toast visible={visible} {...toast} />}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
