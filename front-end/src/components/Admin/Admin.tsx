import { useNavigate } from "react-router-dom";
import styles from "./Admin.module.scss";
const Admin = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <button
                    onClick={() => {
                        navigate("/admin/users");
                    }}
                >
                    Изменение пользователей
                </button>
                <button
                    onClick={() => {
                        navigate("/admin/products");
                    }}
                >
                    Изменение товаров
                </button>
                <button
                    onClick={() => {
                        navigate("/admin/orders");
                    }}
                >
                    Просмотр заказов
                </button>
            </nav>
        </div>
    );
};

export default Admin;
