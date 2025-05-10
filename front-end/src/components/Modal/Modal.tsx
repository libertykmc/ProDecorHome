import { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.scss";
import { Register } from "../Auth/Register";
import { Auth } from "../Auth/Auth";
const Modal = ({
    isActive,
    setActive,
}: {
    isActive: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const formRef = useRef(null);
    const [isRegister, setRegister] = useState(false);
    useEffect(() => {
        if (isActive) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "visible";
        }
    }, [isActive]);
    return (
        <dialog
            open={isActive}
            className={styles.dialog}
            onClick={(event) => {
                if (event.target === formRef.current) {
                    setActive(false);
                }
            }}
            ref={formRef}
        >
            {isRegister ? (
                <Register setRegister={setRegister} setActive={setActive} />
            ) : (
                <Auth setRegister={setRegister} setActive={setActive} />
            )}
        </dialog>
    );
};

export default Modal;
