import { useNavigate } from "react-router-dom";
import styles from "./header.module.scss";
import "./burger-menu.scss";
import { slide as Menu } from "react-burger-menu";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { getProducts } from "../../api/product.api";
import { ProductCreateDto } from "../../dto/product";
import { getUser } from "../../api/user.api";
import { UserDto } from "../../dto/user";
const Header = () => {
  const [isActive, setActive] = useState(false);
  const [user, setUser] = useState<UserDto>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const id = JSON.parse(localStorage.getItem("user") || "{}");
  const [focus, setFocus] = useState(false);
  const [focusInput, setFocusInput] = useState("");
  const [products, setProducts] = useState<ProductCreateDto[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getProducts({
        $filter: `(contains(tolower(title), '${focusInput}'))`,
        $orderby: "",
        $top: "10",
        $skip: "0",
      });
      setProducts(res.list);
    };

    fetchData();
  }, [focusInput]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUser(id);
        setUser(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Modal isActive={isActive} setActive={setActive} />
      <header className={styles.main}>
        <img
          src="/logo.JPG"
          alt="Prodecor"
          onClick={() => {
            navigate("/");
          }}
        />
        <input
          onFocus={() => {
            setTimeout(() => {
              setFocus(true);
            }, 50);
          }}
          onBlur={() => {
            setTimeout(() => {
              setFocus(false);
            }, 150);
          }}
          onChange={(event) => {
            event.preventDefault();
            setTimeout(() => {
              setFocusInput(event.target.value);
            }, 50);
          }}
          placeholder="Поиск"
          className={styles.search}
        />
        {focus && focusInput.length !== 0 ? (
          <div className={styles.productsSearch}>
            {products.map((item) => (
              <div
                key={item.id}
                className={styles.product}
                onClick={() => {
                  navigate(`/product/${item.id}`);
                  window.location.reload();
                }}
              >
                <div className={styles.title}>{item.title}</div>
                {Number(item.discount) === 1 ? (
                  <div className={styles.price}>{item.price} рублей</div>
                ) : (
                  <div className={styles.discountBlockPrice}>
                    <div className={styles.price}>
                      {Math.round(item.price * item.discount)}
                    </div>
                    <div className={styles.priceOld}>{item.price}</div>
                    <div className={styles.price}>рублей</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}

        <nav>
          <button className={styles.link} onClick={() => navigate("/catalog")}>
            Каталог
          </button>
          <button className={styles.link} onClick={() => navigate("/basket")}>
            Корзина
          </button>
          {token ? (
            <>
              <button onClick={() => navigate("/me")} className={styles.link}>
                Профиль
              </button>
              {user?.role === "admin" && (
                <button
                  onClick={() => navigate("/admin/users")}
                  className={styles.link}
                >
                  Админка
                </button>
              )}
            </>
          ) : (
            <button onClick={() => setActive(true)} className={styles.link}>
              Войти
            </button>
          )}
        </nav>
        <div className={styles.burgerOuter}>
          <div className={styles.burgerBlock}></div>
          <Menu
            right
            noOverlay
            burgerButtonClassName={styles.burgerBlock}
            id="sidebar"
            className={"burgerMain"}
          >
            {token ? (
              <>
                <button onClick={() => navigate("/me")} className={styles.link}>
                  Профиль
                </button>

                {user?.role === "admin" && (
                  <button
                    onClick={() => navigate("/admin/users")}
                    className={styles.link}
                  >
                    Админка
                  </button>
                )}
              </>
            ) : (
              <button onClick={() => setActive(true)} className={styles.link}>
                Войти
              </button>
            )}

            <button
              className={styles.link}
              onClick={() => navigate("/catalog")}
            >
              Каталог
            </button>
            <button className={styles.link} onClick={() => navigate("/basket")}>
              Корзина
            </button>
          </Menu>
        </div>
      </header>
    </>
  );
};

export default Header;
