import { useState } from "react";
import { createProduct } from "../../../api/product.api";
import styles from "../Admin.module.scss";
import Admin from "../Admin";
const AdminCreateProduct = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    price: 0,
    discount: "",
    type: "",
  });

  const handleChange = (index: number, newValue: string) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = newValue;
      return updated;
    });
  };

  const [images, setImages] = useState(["", "", "", "", ""]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newData = {
      ...data,
      price: Number(data.price),
      discount: Number(data.discount),
    };
    try {
      await createProduct({
        ...newData,
        images: images,
        id: undefined,
      });
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
            setData((prev) => ({
              ...prev,
              title: event.target.value,
            }));
          }}
          placeholder="Наименование"
        />
        <input
          onChange={(event) => {
            setData((prev) => ({
              ...prev,
              description: event.target.value,
            }));
          }}
          placeholder="Описание"
        />
        <input
          onChange={(event) => {
            setData((prev) => ({
              ...prev,
              price: Number(event.target.value),
            }));
          }}
          placeholder="Цена"
        />
        <input
          type="number"
          step="0.1"
          onChange={(event) => {
            setData((prev) => ({
              ...prev,
              discount: event.target.value,
            }));
          }}
          placeholder="Скидка"
        />
        <input
          onChange={(event) => {
            setData((prev) => ({
              ...prev,
              type: event.target.value,
            }));
          }}
          placeholder="Тип"
        />
        <input
          onChange={(event) => {
            handleChange(0, event.target.value);
          }}
          placeholder="Ссылка на картинку 1"
        />
        <input
          onChange={(event) => {
            handleChange(1, event.target.value);
          }}
          placeholder="Ссылка на картинку 2"
        />
        <input
          onChange={(event) => {
            handleChange(2, event.target.value);
          }}
          placeholder="Ссылка на картинку 3"
        />
        <input
          onChange={(event) => {
            handleChange(3, event.target.value);
          }}
          placeholder="Ссылка на картинку 4"
        />
        <input
          onChange={(event) => {
            handleChange(4, event.target.value);
          }}
          placeholder="Ссылка на картинку 5"
        />
        <button className={styles.button}>Сохранить</button>
      </form>
    </div>
  );
};

export default AdminCreateProduct;
