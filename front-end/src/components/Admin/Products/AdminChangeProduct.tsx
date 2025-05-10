import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProduct, updateProduct } from "../../../api/product.api";
import styles from "../Admin.module.scss";
import Admin from "../Admin";
const AdminChangeProduct = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  // const [user, setUser] = useState<UserDto>();
  const [images, setImages] = useState<string[]>(["", "", "", "", ""]);
  const [productChange, setProductChange] = useState({
    title: "",
    description: "",
    price: 0,
    discount: 1,
    type: "",
  });
  const handleChange = (index: number, newValue: string) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = newValue;
      return updated;
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await getProduct(id);
        setProductChange({
          title: product.title,
          description: product.description,
          price: product.price,
          discount: product.discount,
          type: product.type,
        });
        setImages(product.images);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(productChange);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      updateProduct(id, { ...productChange, images: images });
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
            setProductChange((prev) => ({
              ...prev,
              title: event.target.value,
            }));
          }}
          value={productChange.title}
          placeholder="Наименование"
        />
        <input
          onChange={(event) => {
            setProductChange((prev) => ({
              ...prev,
              description: event.target.value,
            }));
          }}
          value={productChange.description}
          placeholder="Имя"
        />
        <input
          onChange={(event) => {
            setProductChange((prev) => ({
              ...prev,
              price: Number(event.target.value),
            }));
          }}
          value={productChange.price}
          placeholder="Цена"
        />
        <input
          type="number"
          step="0.1"
          onChange={(event) => {
            setProductChange((prev) => ({
              ...prev,
              discount: Number(event.target.value),
            }));
          }}
          value={productChange.discount}
          placeholder="Скидка"
        />

        <input
          onChange={(event) => {
            handleChange(0, event.target.value);
          }}
          value={images[0]}
          placeholder="Ссылка на картинку 1"
        />
        <input
          onChange={(event) => {
            handleChange(1, event.target.value);
          }}
          value={images[1]}
          placeholder="Ссылка на картинку 2"
        />
        <input
          onChange={(event) => {
            handleChange(2, event.target.value);
          }}
          value={images[2]}
          placeholder="Ссылка на картинку 3"
        />
        <input
          onChange={(event) => {
            handleChange(3, event.target.value);
          }}
          value={images[3]}
          placeholder="Ссылка на картинку 4"
        />
        <input
          onChange={(event) => {
            handleChange(4, event.target.value);
          }}
          value={images[4]}
          placeholder="Ссылка на картинку 5"
        />
        <button className={styles.button}>Сохранить</button>
      </form>
    </div>
  );
};

export default AdminChangeProduct;
