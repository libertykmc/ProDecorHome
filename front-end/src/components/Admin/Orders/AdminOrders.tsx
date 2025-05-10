import { useEffect, useState } from "react";
import Admin from "../Admin";
import { getOrders } from "../../../api/order.api";
import { OrderDto } from "../../../dto/order";
import styles from "../Admin.module.scss";
const AdminOrders = () => {
    const [orders, setOrders] = useState<OrderDto[]>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getOrders();
                setOrders(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    console.log(orders);
    // const handleDelete = async (id: string) => {
    //     try {
    //         await deleteUser(id);
    //         window.location.reload();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    return (
        <div className={styles.containerPage}>
            <div className={styles.panel}>
                <Admin />
            </div>
            {orders?.map((u) => (
                <div className={styles.items}>
                    <>
                        <div key={u.id} className={styles.users}>
                            <div>{u.id}</div>
                            <div>{u.user_id}</div>
                            <div>{u.values.name}</div>
                            <div>{u.values.address}</div>
                            <div>{u.values.phone}</div>
                            <div>{u.values.total}</div>
                        </div>
                    </>
                </div>
            ))}
        </div>
    );
};

export default AdminOrders;
