import { useEffect, useState } from "react";
import { UserDto } from "../../../dto/user";
import { deleteUser, getUsers } from "../../../api/user.api";
import styles from "../Admin.module.scss";
import Admin from "../Admin";
import { useNavigate } from "react-router-dom";
const AdminUsers = () => {
    const [users, setUsers] = useState<UserDto[]>();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getUsers();
                setUsers(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteUser(id);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={styles.containerPage}>
            <div className={styles.panel}>
                <Admin />
                <button
                    onClick={() => {
                        navigate(`/admin/users/create`);
                    }}
                    className={styles.button}
                >
                    Создать пользователя
                </button>
            </div>
            {users?.map((u) => (
                <div className={styles.items}>
                    {u.role !== "admin" ? (
                        <>
                            <div key={u.id} className={styles.users}>
                                <div>{u.id}</div>
                                <div>{u.first}</div>
                                <div>{u.second}</div>
                                <div>{u.last}</div>
                                <div>{u.login}</div>
                            </div>
                            <div className={styles.buttons}>
                                <button
                                    onClick={() => {
                                        navigate(`/admin/users/${u.id}`);
                                    }}
                                    className={styles.button}
                                >
                                    Изменить
                                </button>
                                <button
                                    onClick={() => {
                                        handleDelete(u.id);
                                    }}
                                    className={styles.button}
                                >
                                    Удалить
                                </button>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AdminUsers;
