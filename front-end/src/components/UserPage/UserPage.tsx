import { useEffect, useState } from "react";
import styles from "./UserPage.module.scss";
import { getUser, updateUser } from "../../api/user.api";
import { useNavigate } from "react-router-dom";
import { UserDto, UserUpdateDto } from "../../dto/user";
import { getFavorites } from "../../api/favorites.api";
import { FavoritesDto } from "../../dto/favorites";
import { isValidPhone } from "../Auth/validation";

const UserPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserDto>();
    const [userChange, setUserChange] = useState<UserUpdateDto>({
        first: "",
        last: "",
        second: "",
        phone: "",
    });

    const [validateNumber, setValidateNumber] = useState<any>(true);
    const token = JSON.parse(localStorage.getItem("token") || "null");
    const [success, setSuccess] = useState(false);
    const [favorite, setFavorite] = useState<FavoritesDto[]>([]);

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, []);
    console.log(favorite);
    const id = JSON.parse(localStorage.getItem("user") || "{}");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getUser(id);
                setUser(user);
                setUserChange(() => ({
                    first: user.first,
                    last: user.last,
                    second: user.second,
                    phone: user.phone,
                }));
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getFavorites(id);
                setFavorite(res);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const handleUpdate = async () => {
        try {
            await updateUser(id, userChange);
            setSuccess(true);
            window.location.reload();
        } catch (err) {}
    };

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <>
            {token ? (
                <div className={styles.userPage}>
                    <h1 className={styles.name}>
                        Здравствуйте, {user?.last} {user?.first} {user?.second}
                    </h1>
                    <h3 className={styles.profilemail}>
                        Ваш логин: {user?.login}
                    </h3>
                    <h3 className={styles.profilemail}>
                        Ваш номер телефона: {user?.phone}
                    </h3>
                    <div className={styles.profilsettings}>
                        <h2> Настройки профиля</h2>
                        <form
                            className={styles.profilform}
                            onSubmit={(event) => {
                                event.preventDefault();
                                handleUpdate();
                            }}
                        >
                            <div className={styles.profilInputDiv}>
                                <label className={styles.profilInputLabel}>
                                    Имя:
                                </label>
                                <input
                                    type="text"
                                    className={styles.profilInput}
                                    value={userChange.first}
                                    onChange={(event) => {
                                        setUserChange((prev) => ({
                                            ...prev,
                                            first: event.target.value,
                                        }));
                                    }}
                                />
                            </div>
                            <div className={styles.profilInputDiv}>
                                <label className={styles.profilInputLabel}>
                                    Фамилия:
                                </label>
                                <input
                                    type="text"
                                    className={styles.profilInput}
                                    value={userChange.last}
                                    onChange={(event) => {
                                        setUserChange((prev) => ({
                                            ...prev,
                                            last: event.target.value,
                                        }));
                                    }}
                                />
                            </div>
                            <div className={styles.profilInputDiv}>
                                <label className={styles.profilInputLabel}>
                                    Отчество:
                                </label>
                                <input
                                    type="text"
                                    className={styles.profilInput}
                                    value={userChange.second}
                                    onChange={(event) => {
                                        setUserChange((prev) => ({
                                            ...prev,
                                            second: event.target.value,
                                        }));
                                    }}
                                />
                            </div>
                            <div className={styles.profilInputDiv}>
                                <label className={styles.profilInputLabel}>
                                    Телефон:
                                </label>
                                <input
                                    type="phone"
                                    className={styles.profilInput}
                                    value={userChange.phone}
                                    style={
                                        validateNumber
                                            ? {
                                                  outline: "0",
                                                  borderBottom:
                                                      "1px solid #d0cece",
                                              }
                                            : {
                                                  outline: "1px solid red",
                                              }
                                    }
                                    onChange={(event) => {
                                        setUserChange((prev) => ({
                                            ...prev,
                                            phone: event.target.value,
                                        }));
                                        setValidateNumber(
                                            isValidPhone(event.target.value)
                                        );
                                    }}
                                />
                            </div>

                            <button className={styles.profilesave}>
                                Сохранить
                            </button>
                            <button
                                className={styles.profilesave}
                                onClick={logout}
                            >
                                Выйти
                            </button>
                            {success ? (
                                <div>Данные успешно изменены</div>
                            ) : (
                                <div></div>
                            )}
                        </form>
                    </div>
                    <div className={styles.profileFavorite}>
                        <h2>Избранные товары</h2>
                        <div className={styles.favoriteProducts}>
                            {favorite.map((item) => (
                                <div
                                    className={styles.product}
                                    key={item.product_id}
                                    onClick={() => {
                                        navigate(`/product/${item.product_id}`);
                                    }}
                                >
                                    <img
                                        src={``}
                                        alt="product"
                                        className={styles.product_img}
                                    />
                                    <div className={styles.product_name}>
                                        {item.title}
                                    </div>
                                    <div className={styles.product_box_price}>
                                        {Number(item?.discount) === 1 ? (
                                            <div className={styles.price}>
                                                {item?.price} рублей
                                            </div>
                                        ) : (
                                            <div
                                                className={
                                                    styles.discountBlockPrice
                                                }
                                            >
                                                <div className={styles.price}>
                                                    {Math.round(
                                                        (item?.price || 0) *
                                                            (item?.discount ||
                                                                1)
                                                    )}
                                                </div>
                                                <div
                                                    className={styles.priceOld}
                                                >
                                                    {item?.price}
                                                </div>
                                                <div className={styles.price}>
                                                    рублей
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div>Вам необходимо войти или зарегистрироваться</div>
            )}
        </>
    );
};
export default UserPage;
