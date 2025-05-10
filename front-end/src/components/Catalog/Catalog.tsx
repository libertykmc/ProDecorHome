// import { register } from "../../api/api";
import { useEffect, useState } from "react";
import { getProducts } from "../../api/product.api";
import styles from "./catalog.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductCreateDto, ProductRequestDto } from "../../dto/product";
const Catalog = () => {
    const location = useLocation();
    const filter = location.state || {
        filter: `(contains(tolower(type), ''))`,
    };
    const [products, setProducts] = useState<ProductCreateDto[]>([]);
    const [count, setCount] = useState<Number>();
    const [increase, setIncrease] = useState(false);
    const [filters, setFilters] = useState<ProductRequestDto>({
        $filter: filter.filter,
        $orderby: "title desc",
        $top: "3",
        $skip: "0",
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getProducts(filters);
                setProducts((prev) => {
                    if (
                        JSON.stringify([...prev]) ===
                        JSON.stringify([...res.list])
                    ) {
                        return [...prev];
                    } else {
                        return [...prev, ...res.list];
                    }
                });

                setCount(res.count);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [increase]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getProducts(filters);
                setProducts(res.list);
                setCount(res.count);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [filters.$filter, filters.$orderby]);

    const navigate = useNavigate();

    return (
        <main className={styles.container}>
            <nav>
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
            <div className={styles.containerInfo}>
                <h2>Каталог товаров</h2>
                <div className={styles.selections}>
                    <div className={styles.select}>
                        <select
                            onChange={(event) => {
                                setFilters((prev) => ({
                                    ...prev,
                                    $skip: "0",
                                    $filter: `(contains(tolower(type), '${event.target.value}'))`,
                                }));
                                filter.filter = `(contains(tolower(type), '${event.target.value}'))`;
                            }}
                        >
                            <option
                                value={""}
                                selected={
                                    filters.$filter ===
                                    `(contains(tolower(type), ''))`
                                        ? true
                                        : false
                                }
                            >
                                Все категории
                            </option>
                            <option
                                value={"doors"}
                                selected={
                                    filters.$filter ===
                                    `(contains(tolower(type), 'doors'))`
                                        ? true
                                        : false
                                }
                            >
                                Двери
                            </option>
                            <option
                                value={"wallpaper"}
                                selected={
                                    filters.$filter ===
                                    `(contains(tolower(type), 'wallpaper'))`
                                        ? true
                                        : false
                                }
                            >
                                Обои
                            </option>
                            <option
                                value={"paint"}
                                selected={
                                    filters.$filter ===
                                    `(contains(tolower(type), 'paint'))`
                                        ? true
                                        : false
                                }
                            >
                                Краски
                            </option>
                            <option
                                value={"flooring"}
                                selected={
                                    filters.$filter ===
                                    `(contains(tolower(type), 'flooring'))`
                                        ? true
                                        : false
                                }
                            >
                                Напольное покрытие
                            </option>
                            <option
                                value={"radiators"}
                                selected={
                                    filters.$filter ===
                                    `(contains(tolower(type), 'raidators'))`
                                        ? true
                                        : false
                                }
                            >
                                Радиаторы
                            </option>
                            <option
                                value={"plumbing"}
                                selected={
                                    filters.$filter ===
                                    `(contains(tolower(type), 'plumbing'))`
                                        ? true
                                        : false
                                }
                            >
                                Сантехника
                            </option>
                            <option
                                value={"bathtubs"}
                                selected={
                                    filters.$filter ===
                                    `(contains(tolower(type), 'bathtubs'))`
                                        ? true
                                        : false
                                }
                            >
                                Ванны
                            </option>
                            <option
                                value={"stucco_decor"}
                                selected={
                                    filters.$filter ===
                                    `(contains(tolower(type), 'stucco_decor'))`
                                        ? true
                                        : false
                                }
                            >
                                Лепной декор
                            </option>
                            <option
                                value={"lightning"}
                                selected={
                                    filters.$filter ===
                                    `(contains(tolower(type), 'lightning'))`
                                        ? true
                                        : false
                                }
                            >
                                Освещение
                            </option>
                        </select>
                    </div>
                    <div className={styles.select}>
                        <select
                            onChange={(event) => {
                                setFilters((prev) => ({
                                    ...prev,
                                    $skip: "0",
                                    $orderby: event.target.value,
                                }));
                            }}
                        >
                            <option value={"title desc"}>
                                Порядок по алфавиту
                            </option>
                            <option value={"price desc"}>
                                Порядок: сперва дорогие
                            </option>
                            <option value={"price asc"}>
                                Порядок: сперва дешевые
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={styles.products}>
                {products.map((item) => (
                    <div
                        className={styles.product}
                        key={item.id}
                        onClick={() => {
                            navigate(`/product/${item.id}`);
                        }}
                    >
                        <img className={styles.img} src={item?.images[0]} />
                        <div className={styles.title}>{item.title}</div>
                        <p className={styles.description}>{item.description}</p>
                        {Number(item.discount) === 1 ? (
                            <div className={styles.price}>
                                {item.price} рублей
                            </div>
                        ) : (
                            <div className={styles.discountBlockPrice}>
                                <div className={styles.price}>
                                    {Math.round(item.price * item.discount)}
                                </div>
                                <div className={styles.priceOld}>
                                    {item.price}
                                </div>
                                <div className={styles.price}>рублей</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className={styles.catalog_link}>
                {/* поменять количество получаемых товаров - top  */}
                {Number(filters.$skip) + Number(filters.$top) <
                Number(count) ? (
                    <button
                        className={styles.more}
                        onClick={() => {
                            setFilters((prev) => ({
                                ...prev,
                                $skip: String(Number(prev.$skip) + 3),
                            }));
                            setIncrease((prev) => !prev);
                        }}
                    >
                        Показать еще
                    </button>
                ) : (
                    <div></div>
                )}
            </div>
        </main>
    );
};

export default Catalog;
