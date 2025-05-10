import { useEffect, useState } from "react";
import styles from "./basket.module.scss";
import { useNavigate } from "react-router-dom";
import { deleteBacket, getBasket, updateQuantity } from "../../api/basket.api";
import { BasketDto } from "../../dto/basket.dto";
import { getUser } from "../../api/user.api";
import { createOrder } from "../../api/order.api";
const Basket = () => {
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem("user") || "{}");
    const [userOrder, setUserOrder] = useState({
        first: "",
        phone: "",
        address: "",
    });
    const [successOrder, setSuccessOrder] = useState("");
    const [basket, setBasket] = useState<BasketDto[]>([]);
    const [sumPrice, setSumPrice] = useState(
        basket.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0)
    );
    console.log(basket);
    const [changedBasket, setChangedBasket] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getUser(userId);
                setUserOrder((prev) => ({
                    ...prev,
                    first: res.first,
                    phone: res.phone || "",
                }));
            } catch (err) {
                console.log(err);
            }
        };
        if (Object.keys(userId).length === 0) {
            setUserOrder({
                first: "",
                phone: "",
                address: "",
            });
        } else {
            fetchData();
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getBasket(userId);
                setBasket(res);
                setChangedBasket(false);
            } catch (err) {
                console.log(err);
            }
        };
        if (Object.keys(userId).length === 0) {
            setBasket([]);
            setChangedBasket(false);
        } else {
            fetchData();
        }
    }, [changedBasket]);

    useEffect(() => {
        setSumPrice(
            basket.reduce((sum, item) => {
                return (
                    sum + Math.round(item.price * item.discount) * item.quantity
                );
            }, 0)
        );
    }, [basket]);

    const handleOrder = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = {
            user_id: userId,
            product_ids: basket.map((item) => item.id),
            values: {
                name: userOrder.first,
                address: userOrder.address,
                phone: userOrder.phone,
                total: sumPrice,
            },
        };
        console.log(data);
        console.log(data);
        if (data.product_ids.length !== 0) {
            try {
                await createOrder(data);
                setChangedBasket(true);
                setSuccessOrder("Заявка успешно создана");
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("fjdljl");

            setSuccessOrder("У вас нет товаров в корзине");
        }
    };

    const changeQuantity = async (id: string, quantity: number) => {
        console.log(id, quantity);
        try {
            await updateQuantity({ id: id, quantity: quantity });
            setChangedBasket(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteBacket(id);
            setChangedBasket(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <main className={styles.container}>
            <nav className={styles.breadcrumbs}>
                <button
                    onClick={() => {
                        navigate("/");
                    }}
                    className={styles.breadcrumbslink}
                >
                    Главная
                </button>
                <span className={styles.breadcrumbsspan}> / </span>
                <button
                    onClick={() => {
                        navigate("/catalog");
                    }}
                    className={styles.breadcrumbslink}
                >
                    Каталог товаров
                </button>
            </nav>
            <div className={styles.products}>
                <div className={styles.decor}>
                    <div className={styles.decor_name}>Товар</div>
                    <div className={styles.decor_quantity}>Количество</div>
                </div>
                <div className={styles.productsItems}>
                    {basket.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <div className={styles.itemContainer}>
                                <img className={styles.img} src={""} />
                                <div className={styles.itemInfo}>
                                    <div className={styles.itemInfoFirst}>
                                        <div className={styles.title}>
                                            {item.title}
                                        </div>
                                        <div className={styles.description}>
                                            {item.description}
                                        </div>
                                    </div>
                                    <div className={styles.price}>
                                        {Math.round(
                                            (item?.price || 0) *
                                                (item?.discount || 1)
                                        )}
                                        <span> </span>
                                        рублей
                                    </div>
                                </div>
                            </div>
                            <input
                                onChange={(event) => {
                                    if (Number(event.target.value) > -1) {
                                        changeQuantity(
                                            item.id,
                                            Number(event.target.value)
                                        );
                                    }
                                }}
                                className={styles.itemQuantity}
                                type="text"
                                value={item.quantity > -1 ? item.quantity : -1}
                            />
                            <div
                                className={styles.delete}
                                onClick={() => {
                                    handleDelete(item.id);
                                }}
                            >
                                X
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <form
                className={styles.form}
                onSubmit={(event) => {
                    handleOrder(event);
                }}
            >
                <div className={styles.titleForm}>Оформление заявки</div>
                <input
                    className={styles.input}
                    placeholder="Имя"
                    type="text"
                    value={userOrder.first}
                    onChange={(event) => {
                        setUserOrder((prev) => ({
                            ...prev,
                            first: event.target.value,
                        }));
                    }}
                />
                <input
                    className={styles.input}
                    placeholder="Номер телефона"
                    type="text"
                    value={userOrder.phone}
                    onChange={(event) => {
                        setUserOrder((prev) => ({
                            ...prev,
                            phone: event.target.value,
                        }));
                    }}
                />

                <input
                    className={styles.input}
                    placeholder="Адрес доставки"
                    type="text"
                    value={userOrder.address}
                    onChange={(event) => {
                        setUserOrder((prev) => ({
                            ...prev,
                            address: event.target.value,
                        }));
                    }}
                />
                <div className={styles.price}>Итого: {sumPrice} рублей</div>
                <button className={styles.button}>Отправить заявку</button>
                <div>{successOrder}</div>
            </form>
            <div></div>
        </main>
    );
};

export default Basket;
