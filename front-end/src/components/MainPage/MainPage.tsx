import { useNavigate } from "react-router-dom";
import styles from "./MainPage.module.scss";
const MainPage = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.mainPage}>
      <div className={styles.main}>
        <h1 className={styles.slogan}>ремонт и дизайн</h1>
        <h1 className={styles.slogan2}>искусство создания пространства</h1>
        <div className={styles.background}>
          <div className={styles.background1} />
          <video
            className={styles.video}
            autoPlay
            muted
            loop
            src="/background.mp4"
          />
          <div className={styles.background2} />
        </div>
      </div>
      <div className={styles.forBox}>
        <h2 className={styles.forBoxH}>Мы это...</h2>
        <div className={styles.for}>
          <div className={styles.forItemDouble}>
            <div
              className={styles.forItemBig1}
              onClick={() => {
                navigate("/catalog/", {
                  state: {
                    filter: "wallpaper",
                  },
                });
              }}
            >
              ОБОИ
            </div>
            <div
              className={styles.forItemBig2}
              onClick={() => {
                navigate("/catalog/", {
                  state: {
                    filter: "stucco_decor",
                  },
                });
              }}
            >
              ЛЕПНОЙ ДЕКОР
            </div>
          </div>
          <div className={styles.forItemTriple}>
            <div
              className={styles.forItem1}
              onClick={() => {
                navigate("/catalog/", {
                  state: {
                    filter: "colors",
                  },
                });
              }}
            >
              КРАСКИ
            </div>
            <div
              className={styles.forItem2}
              onClick={() => {
                navigate("/catalog/", {
                  state: {
                    filter: "lightning",
                  },
                });
              }}
            >
              ОСВЕЩЕНИЕ
            </div>
            <div
              className={styles.forItem3}
              onClick={() => {
                navigate("/catalog/", {
                  state: {
                    filter: "doors",
                  },
                });
              }}
            >
              ДВЕРИ
            </div>
          </div>
          <div className={styles.forItemDouble}>
            <div
              className={styles.forItemBig3}
              onClick={() => {
                navigate("/catalog/", {
                  state: {
                    filter: "flooring",
                  },
                });
              }}
            >
              НАПОЛЬНОЕ ПОКРЫТИЕ
            </div>
            <div
              className={styles.forItemBig4}
              onClick={() => {
                navigate("/catalog/", {
                  state: {
                    filter: "bathtubs",
                  },
                });
              }}
            >
              ДЛЯ ВАННОЙ КОМНАТЫ
            </div>
          </div>
          <div className={styles.forItemDouble}>
            <div
              className={styles.forItemBig5}
              onClick={() => {
                navigate("/catalog/", {
                  state: {
                    filter: "plumbing",
                  },
                });
              }}
            >
              САНТЕХНИКА
            </div>
            <div
              className={styles.forItemBig6}
              onClick={() => {
                navigate("/catalog/", {
                  state: {
                    filter: "raidators",
                  },
                });
              }}
            >
              РАДИАТОРЫ
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
