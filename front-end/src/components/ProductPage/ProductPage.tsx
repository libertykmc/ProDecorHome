import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useLocation } from "react-router-dom";
import styles from "./ProductPage.module.scss";
import { useEffect, useState } from "react";
import { getProduct } from "../../api/product.api";
import { ProductCreateDto } from "../../dto/product";
import {
    createFavorites,
    deleteFavorites,
    getFavorites,
} from "../../api/favorites.api";
import { FavoritesDto } from "../../dto/favorites";
import { createBasket, getBasket } from "../../api/basket.api";

const ProductPage = () => {
    const userId = JSON.parse(localStorage.getItem("user") || "null");

    const location = useLocation();
    const [isLiked, setLiked] = useState<Boolean>();
    const [product, setProduct] = useState<ProductCreateDto>();
    const [favorites, setFavorites] = useState<FavoritesDto[]>([]);
    const [currentFavorite, setCurrentFavorite] = useState<FavoritesDto>();
    const productId = location.pathname.split("/product/")[1];
    // const [active, setActive] = useState(0);
    const [swiper, setSwiper] = useState<any>();
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (product === undefined) {
                    const res = await getProduct(productId);
                    setProduct(res);
                }
                if (userId) {
                    const resFav = await getFavorites(userId);
                    setFavorites(resFav);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [isLiked]);
    console.log(product);
    useEffect(() => {
        const checkLike = () => {
            if (favorites) {
                for (const item of favorites) {
                    if (item.product_id === productId) {
                        setLiked(true);
                        setCurrentFavorite(item);
                        return;
                    }
                }

                setLiked(false);
                return;
            }
        };
        checkLike();
    }, [favorites]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getBasket(userId);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const addBasket = async () => {
        try {
            await createBasket({
                user_id: userId,
                product_id: productId,
                quantity: 1,
            });
            setSuccess(true);
        } catch (err) {
            console.log(err);
        }
    };

    const addFavorites = async () => {
        try {
            const res = await createFavorites({
                user_id: userId,
                product_id: productId,
            });
            setCurrentFavorite(res);
            setLiked(true);
        } catch (err) {
            console.log(err);
        }
    };

    const delFavorites = async () => {
        try {
            if (currentFavorite) {
                await deleteFavorites(currentFavorite?.id);
                setCurrentFavorite(undefined);
                setLiked(false);
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div className={styles.product}>
                <div className={styles.main__artic}>
                    <div className={styles.artic__content}>
                        <div className={styles.article__left}>
                            <Swiper
                                modules={[
                                    Navigation,
                                    Pagination,
                                    Scrollbar,
                                    A11y,
                                ]}
                                slidesPerView={1}
                                // activeIndex={active}
                                onSwiper={setSwiper}
                                style={{
                                    zIndex: "0",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "15px",
                                }}
                            >
                                <div className={styles.article__fill_img}>
                                    <div>
                                        {product &&
                                        product.images.length > 0 ? (
                                            <SwiperSlide
                                                style={{
                                                    maxHeight: "100%",
                                                }}
                                            >
                                                <div
                                                    className={
                                                        styles.article__img
                                                    }
                                                >
                                                    <img
                                                        src={`/${product?.images[0]}`}
                                                        alt=""
                                                        className={
                                                            styles.article__img
                                                        }
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ) : (
                                            <></>
                                        )}

                                        {product &&
                                        product.images.length > 1 ? (
                                            <SwiperSlide>
                                                <div
                                                    className={
                                                        styles.article__img
                                                    }
                                                >
                                                    <img
                                                        src={`/${product?.images[1]}`}
                                                        alt=""
                                                        className={
                                                            styles.article__img
                                                        }
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ) : (
                                            <></>
                                        )}
                                        {product &&
                                        product.images.length > 2 ? (
                                            <SwiperSlide>
                                                <div
                                                    className={
                                                        styles.article__img
                                                    }
                                                >
                                                    <img
                                                        src={`/${product?.images[2]}`}
                                                        alt=""
                                                        className={
                                                            styles.article__img
                                                        }
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ) : (
                                            <></>
                                        )}
                                        {product &&
                                        product.images.length > 3 ? (
                                            <SwiperSlide>
                                                <div
                                                    className={
                                                        styles.article__img
                                                    }
                                                >
                                                    <img
                                                        src={`/${product?.images[3]}`}
                                                        alt=""
                                                        className={
                                                            styles.article__img
                                                        }
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ) : (
                                            <></>
                                        )}
                                        {product &&
                                        product.images.length > 4 ? (
                                            <SwiperSlide>
                                                <div
                                                    className={
                                                        styles.article__img
                                                    }
                                                >
                                                    <img
                                                        src={`/${product?.images[4]}`}
                                                        alt=""
                                                        className={
                                                            styles.article__img
                                                        }
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.article__img_bar}>
                                    {product && product.images.length > 0 ? (
                                        <div
                                            className={
                                                styles.article__img_bar_div
                                            }
                                            onClick={() => {
                                                // setActive(0);
                                                swiper.slideTo(0);
                                            }}
                                        >
                                            <img
                                                src={`/${product?.images[0]}`}
                                                alt=""
                                            />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    {product && product?.images.length > 1 ? (
                                        <div
                                            className={
                                                styles.article__img_bar_div
                                            }
                                            onClick={() => {
                                                // setActive(1);
                                                swiper.slideTo(1);
                                            }}
                                        >
                                            <img
                                                src={`/${product?.images[1]}`}
                                                alt=""
                                            />
                                        </div>
                                    ) : (
                                        <></>
                                    )}

                                    {product && product.images.length > 2 ? (
                                        <div
                                            className={
                                                styles.article__img_bar_div
                                            }
                                            onClick={() => {
                                                // setActive(2);
                                                swiper.slideTo(2);
                                            }}
                                        >
                                            <img
                                                src={`/${product?.images[2]}`}
                                                alt=""
                                            />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    {product && product.images.length > 3 ? (
                                        <div
                                            className={
                                                styles.article__img_bar_div
                                            }
                                            onClick={() => {
                                                // setActive(3);
                                                swiper.slideTo(3);
                                            }}
                                        >
                                            <img
                                                src={`/${product?.images[3]}`}
                                                alt=""
                                            />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    {product && product.images.length > 4 ? (
                                        <div
                                            className={
                                                styles.article__img_bar_div
                                            }
                                            onClick={() => {
                                                // setActive(4);
                                                swiper.slideTo(4);
                                            }}
                                        >
                                            <img
                                                src={`/${product?.images[4]}`}
                                                alt=""
                                            />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </Swiper>
                        </div>
                        <div className={styles.article__right}>
                            <div className={styles.article__block}>
                                <h2 className={styles.article__title}>
                                    {product?.title}
                                </h2>
                                {Number(product?.discount) === 1 ? (
                                    <div className={styles.price}>
                                        {product?.price} рублей
                                    </div>
                                ) : (
                                    <div className={styles.discountBlockPrice}>
                                        <div className={styles.price}>
                                            {Math.round(
                                                (product?.price || 0) *
                                                    (product?.discount || 1)
                                            )}
                                        </div>
                                        <div className={styles.priceOld}>
                                            {product?.price}
                                        </div>
                                        <div className={styles.price}>
                                            рублей
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={styles.main__container}>
                                <h3 className={styles.main__title}>
                                    Описание товара
                                </h3>
                                <div className={styles.main__content}>
                                    <div className={styles.main__text}>
                                        {product?.description}
                                    </div>
                                </div>
                                <div className={styles.cart_bottoms}>
                                    <button
                                        className={styles.cart_bottoms_1}
                                        onClick={() => {
                                            addBasket();
                                        }}
                                    >
                                        Добавить в корзину
                                    </button>
                                    <button
                                        className={styles.likebutton}
                                        onClick={() => {
                                            if (isLiked) {
                                                delFavorites();
                                            } else {
                                                addFavorites();
                                            }
                                        }}
                                    >
                                        <img
                                            src={
                                                isLiked
                                                    ? "/favoriteliked.svg"
                                                    : "/favorite.svg"
                                            }
                                            title="Добавить в избранное"
                                            className={styles.favorite}
                                        />
                                    </button>
                                </div>
                                {success ? (
                                    <div className={styles.info}>
                                        Вы успешно добавили товар в корзину!
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPage;
