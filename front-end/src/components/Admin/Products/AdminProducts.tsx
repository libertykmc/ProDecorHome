import { useEffect, useState } from "react";
import styles from "../Admin.module.scss";
import Admin from "../Admin";
import { useNavigate } from "react-router-dom";
import { ProductDto } from "../../../dto/product";
import { deleteProduct, getProducts } from "../../../api/product.api";
const AdminProducts = () => {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getProducts({
                    $filter: `(contains(tolower(title), ''))`,
                    $orderby: "",
                    $top: "10",
                    $skip: "0",
                });
                setProducts(res.list);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    console.log(products);
    const handleDelete = async (id: string) => {
        try {
            await deleteProduct(id);
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
                        navigate(`/admin/products/create`);
                    }}
                    className={styles.button}
                >
                    Создать продукт
                </button>
            </div>
            {products?.map((u) => (
                <div className={styles.items}>
                    <>
                        <div key={u.id} className={styles.users}>
                            <div>{u.id}</div>
                            <div>{u.title}</div>
                            <div>{u.price}</div>
                            <div>{u.discount}</div>
                            <div>{u.images}</div>
                        </div>
                        <div className={styles.buttons}>
                            <button
                                onClick={() => {
                                    navigate(`/admin/products/${u.id}`);
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
                </div>
            ))}
        </div>
    );
};

export default AdminProducts;
