import { useState } from "react";
import styles from "./auth.module.scss";
import { authRegister } from "../../api/auth.api";
import { LoginValidate } from "./Auth";
import {
    isValidEmail,
    isValidPassword,
    isValidPhone,
    isValidName,
} from "./validation";

interface RegisterValidate extends LoginValidate {
    first: any;
    repeatPassword: any;
    phone: any;
}

export function Register({
    setRegister,
    setActive,
}: {
    setRegister: React.Dispatch<React.SetStateAction<boolean>>;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [data, setData] = useState({
        login: "",
        password: "",
        first: "",
        last: "",
        second: "",
        phone: "",
        role: "user",
    });

    const [repeatPassword, setRepeatPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const [validate, setValidate] = useState<RegisterValidate>({
        email: null,
        password: null,
        repeatPassword: null,
        first: null,
        phone: null,
    });

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");
        if (data.password === repeatPassword)
            try {
                const res = await authRegister(data);
                localStorage.setItem("token", JSON.stringify(res.token));
                localStorage.setItem("user", JSON.stringify(res.id));
                setSuccess(true);
            } catch (err: any) {
                if (err.response.status === 422) {
                    setError("Такой пользователь уже существует");
                }
            }
        else {
            setError("Пароли не совпадают!");
        }
    };

    return (
        <div className={styles.PageContainer}>
            {success ? (
                <div className={styles.ModalForm}>
                    <h2 className={styles.success}>
                        Вы успешно зарегистрировались!
                    </h2>
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
                        handleRegister(event);
                    }}
                >
                    <div className={styles.Inputs}>
                        <input
                            className={styles.ModalInput}
                            type="text"
                            name="login"
                            placeholder="Email"
                            title="Это поле является обязательным"
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
                            required
                        />
                        {
                            <img
                                className={styles.attention}
                                src="attention.svg"
                            ></img>
                        }
                        <input
                            className={styles.ModalInput}
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            title="Это поле является обязательным"
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
                            required
                        />
                        <input
                            className={styles.ModalInput}
                            type="password"
                            name="repeat-password"
                            placeholder="Повторите пароль"
                            title="Пароли должны совпадать"
                            style={
                                validate.repeatPassword
                                    ? {
                                          outline: "0",
                                          borderBottom: "1px solid #d0cece",
                                      }
                                    : {
                                          outline: "1px solid red",
                                      }
                            }
                            onChange={(event) => {
                                setRepeatPassword(event.target.value);
                                setValidate((prev) => ({
                                    ...prev,
                                    repeatPassword: isValidPassword(
                                        event.target.value
                                    ),
                                }));
                            }}
                            required
                        />
                        <input
                            className={styles.ModalInput}
                            type="text"
                            name="first"
                            title="Это поле является обязательным"
                            placeholder="Имя"
                            onChange={(event) => {
                                setData((prev) => ({
                                    ...prev,
                                    first: event.target.value,
                                }));
                                setValidate((prev) => ({
                                    ...prev,
                                    first: isValidName(event.target.value),
                                }));
                            }}
                            style={
                                validate.first
                                    ? {
                                          outline: "0",
                                          borderBottom: "1px solid #d0cece",
                                      }
                                    : {
                                          outline: "1px solid red",
                                      }
                            }
                            required
                        />
                        <input
                            className={styles.ModalInput}
                            type="text"
                            name="last"
                            placeholder="Фамилия"
                            onChange={(event) =>
                                setData((prev) => ({
                                    ...prev,
                                    last: event.target.value,
                                }))
                            }
                        />
                        <input
                            className={styles.ModalInput}
                            type="text"
                            name="second"
                            placeholder="Отчество"
                            onChange={(event) =>
                                setData((prev) => ({
                                    ...prev,
                                    second: event.target.value,
                                }))
                            }
                        />
                        <input
                            className={styles.ModalInput}
                            type="text"
                            name="number"
                            placeholder="Номер телефона"
                            style={
                                validate.phone
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
                                    phone: event.target.value,
                                }));
                                setValidate((prev) => ({
                                    ...prev,
                                    phone: isValidPhone(event.target.value),
                                }));
                            }}
                        />
                    </div>
                    {error ? (
                        <div className={styles.error}>{error}</div>
                    ) : (
                        <div></div>
                    )}
                    <div className={styles.Buttons}>
                        <button className={styles.PrimaryButton}>
                            Зарегистрироваться
                        </button>
                        <button
                            className={styles.PrimaryButton}
                            onClick={() => {
                                setRegister((prev) => !prev);
                            }}
                        >
                            Войти
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
