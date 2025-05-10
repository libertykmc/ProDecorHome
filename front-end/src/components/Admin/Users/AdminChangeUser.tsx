import { useEffect, useState } from "react";
import Admin from "../Admin";
import styles from "../Admin.module.scss";
import { UserUpdateDtoAdmin } from "../../../dto/user";
import { useLocation } from "react-router-dom";
import { getUser, updateUser } from "../../../api/user.api";

const AdminChangeUser = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[3];

    // const [user, setUser] = useState<UserDto>();
    const [userChange, setUserChange] = useState<UserUpdateDtoAdmin>({
        login: "",
        first: "",
        last: "",
        second: "",
        phone: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getUser(id);
                // setUser(user);
                setUserChange(() => ({
                    login: user.login,
                    first: user.first,
                    last: user.last,
                    second: user.second,
                    phone: user.phone,
                }));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            updateUser(id, userChange);
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
                        setUserChange((prev) => ({
                            ...prev,
                            login: event.target.value,
                        }));
                    }}
                    value={userChange?.login}
                    placeholder="Логин"
                />
                <input
                    onChange={(event) => {
                        setUserChange((prev) => ({
                            ...prev,
                            first: event.target.value,
                        }));
                    }}
                    value={userChange?.first}
                    placeholder="Имя"
                />
                <input
                    onChange={(event) => {
                        setUserChange((prev) => ({
                            ...prev,
                            last: event.target.value,
                        }));
                    }}
                    value={userChange?.last}
                    placeholder="Фамилия"
                />
                <input
                    onChange={(event) => {
                        setUserChange((prev) => ({
                            ...prev,
                            second: event.target.value,
                        }));
                    }}
                    value={userChange?.second}
                    placeholder="Отчество"
                />
                <input
                    onChange={(event) => {
                        setUserChange((prev) => ({
                            ...prev,
                            phone: event.target.value,
                        }));
                    }}
                    value={userChange?.phone}
                    placeholder="Отчество"
                />
                <button className={styles.button}>Сохранить</button>
            </form>
        </div>
    );
};

export default AdminChangeUser;
