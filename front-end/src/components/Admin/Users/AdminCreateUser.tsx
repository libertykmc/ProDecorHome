import { useState } from "react";
import Admin from "../Admin";
import styles from "../Admin.module.scss";
import { authRegister } from "../../../api/auth.api";
const AdminCreateUser = () => {
    const [data, setData] = useState({
        login: "",
        password: "",
        first: "",
        last: "",
        second: "",
        phone: "",
        role: "user",
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await authRegister(data);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={styles.containerPage}>
            <Admin />
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    onChange={(event) => {
                        setData((prev) => ({
                            ...prev,
                            login: event.target.value,
                        }));
                    }}
                    placeholder="Логин"
                />
                <input
                    onChange={(event) => {
                        setData((prev) => ({
                            ...prev,
                            first: event.target.value,
                        }));
                    }}
                    placeholder="Имя"
                />
                <input
                    onChange={(event) => {
                        setData((prev) => ({
                            ...prev,
                            last: event.target.value,
                        }));
                    }}
                    placeholder="Фамилия"
                />
                <input
                    onChange={(event) => {
                        setData((prev) => ({
                            ...prev,
                            second: event.target.value,
                        }));
                    }}
                    placeholder="Отчество"
                />
                <input
                    onChange={(event) => {
                        setData((prev) => ({
                            ...prev,
                            phone: event.target.value,
                        }));
                    }}
                    placeholder="Телефон"
                />
                <input
                    onChange={(event) => {
                        setData((prev) => ({
                            ...prev,
                            password: event.target.value,
                        }));
                    }}
                    placeholder="Пароль"
                />
                <button className={styles.button}>Сохранить</button>
            </form>
        </div>
    );
};

export default AdminCreateUser;
