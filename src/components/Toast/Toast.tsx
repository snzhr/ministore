import React, { useEffect, useState } from 'react'
import styles from './Toast.module.scss';

type ToastProps = {
    message: string;
    mode: "primary" | "success" | "danger" | "warning";
    show: () => void;
    onClose: () => void;
}


// need to work more
function Toast({message, mode, onClose, show}: ToastProps) {
    const [showToast, setShowToast] = useState(true);

    useEffect(() => {
        let timeoutId: number | undefined; 
        timeoutId = setTimeout(() => {
            onClose?.();
            clearTimeout(timeoutId);
        }, 3000);
        return () => {
            clearTimeout(timeoutId);
        }
    }, []);

    function onShowToast() {
        setShowToast(true);
    }


    function onCloseToast() {
        setShowToast(false);
    }

    return (
        showToast ? 
    <div className={`${styles.toast} ${styles[mode]}`}>
        <div>
            {message}
        </div>
    </div>
    : null
  )
}

export default Toast