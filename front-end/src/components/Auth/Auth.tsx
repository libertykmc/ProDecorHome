import { useState } from "react";
import styles from "./auth.module.scss";
import { authLogin } from "../../api/auth.api";
import { isValidEmail, isValidPassword } from "./validation";

export interface LoginValidate {
    email: any;
    password: any;
}

export function Auth({
    setRegister,
    setActive,
}: {
    setRegister: React.Dispatch<React.SetStateAction<boolean>>;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [data, setData] = useState({
        login: "",
        password: "",
    });

    const [validate, setValidate] = useState<LoginValidate>({
        email: null,
        password: null,
    });
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(false);
        try {
            const res = await authLogin(data);
            localStorage.setItem("token", JSON.stringify(res.token));
            localStorage.setItem("user", JSON.stringify(res.id));
            setSuccess(true);
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className={styles.PageContainer}>
            {success ? (
                <div className={styles.ModalForm}>
                    <h2>Вы успешно вошли!</h2>
                    <button
                        className={styles.PrimaryButton}
                        onClick={() => {
                            setSuccess(false);
                            setActive(false);
                            window.location.reload();
                        }}
                    >
                        Продолжить
                    </button>
                </div>
            ) : (
                <form
                    className={styles.ModalForm}
                    onSubmit={(event) => {
                        handleLogin(event);
                    }}
                >
                    <div className={styles.Inputs}>
                        <input
                            className={styles.ModalInput}
                            type="text"
                            name="login"
                            placeholder="Email"
                            style={
                                validate.email
                                    ? {
                                          outline: "0",
                                          borderBottom: "1px solid #d0cece",
                                      }
                                    : {
                                          outline: "1px solid red",
                                      }
                            }
                            onChange={(event) => {
                                setData((prev) => ({
                                    ...prev,
                                    login: event.target.value,
                                }));
                                setValidate((prev) => ({
                                    ...prev,
                                    email: isValidEmail(event.target.value),
                                }));
                            }}
                        />
                        <input
                            className={styles.ModalInput}
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            style={
                                validate.password
                                    ? {
                                          outline: "0",
                                          borderBottom: "1px solid #d0cece",
                                      }
                                    : {
                                          outline: "1px solid red",
                                      }
                            }
                            onChange={(event) => {
                                setData((prev) => ({
                                    ...prev,
                                    password: event.target.value,
                                }));

                                setValidate((prev) => ({
                                    ...prev,
                                    password: isValidPassword(
                                        event.target.value
                                    ),
                                }));
                            }}
                        />
                    </div>
                    {error ? (
                        <div className={styles.error}>
                            Неверно введены данные
                        </div>
                    ) : (
                        <div></div>
                    )}

                    <div className={styles.Buttons}>
                        <button className={styles.PrimaryButton}>Войти</button>
                        <button
                            className={styles.PrimaryButton}
                            onClick={() => {
                                setRegister((prev) => !prev);
                            }}
                        >
                            Зарегистрироваться
                        </button>
                        <button
                            className={styles.close}
                            onClick={() => {
                                setActive(false);
                            }}
                        ></button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Auth;
