import { useNavigate } from "react-router-dom";
import styles from "./footer.module.scss";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <img className={styles.logoimg} src="/logo.JPG" alt="Prodecor" />
      <div className={styles.info}>
        <div className={styles.menu}>
          <h4 className={styles.menu}>Меню</h4>
          <button
            onClick={() => {
              navigate("/catalog");
            }}
            className={styles.footerlink}
          >
            Каталог
          </button>
          <button
            onClick={() => {
              navigate("/basket");
            }}
            className={styles.footerlink}
          >
            Корзина
          </button>
        </div>
        <div className={styles.contacts}>
          <h4 className={styles.menu}>Контакты</h4>
          <h4 style={{ cursor: "default" }} className={styles.footerlink}>
            Мамедов Ахмед 3-42
          </h4>
          <a
            className={styles.footerlink}
            href="https://yandex.ru/maps/5/ivanovo/house/rabfakovskaya_ulitsa_34/YEkYfwNiQUEPQFttfXxxcH5mYQ==/?ll=40.942848%2C57.001255&z=16.9"
            target="_blank"
          >
            ул. Рабфаковская д. 34, Иваново
          </a>
          <div className={styles.footericon}>
            <a href="https://vk.com/geogecell" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#888888"
                  d="M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.421-2.386-2.625-3.504-1.686-1.565-1.765-1.602-.313-3.486 1.801-2.339 4.157-5.336 2.073-5.336h-3.981c-.772 0-.828.435-1.103 1.083-.995 2.347-2.886 5.387-3.604 4.922-.751-.485-.407-2.406-.35-5.261.015-.754.011-1.271-1.141-1.539-.629-.145-1.241-.205-1.809-.205-2.273 0-3.841.953-2.95 1.119 1.571.293 1.42 3.692 1.054 5.16-.638 2.556-3.036-2.024-4.035-4.305-.241-.548-.315-.974-1.175-.974h-3.255c-.492 0-.787.16-.787.516 0 .602 2.96 6.72 5.786 9.77 2.756 2.975 5.48 2.708 7.376 2.708z"
                />
              </svg>
            </a>
            <a href="https://t.me/geocelll">
              <svg
                fill="#000000"
                height="24px"
                width="24px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 455 455"
              >
                <g>
                  <path
                    fill="#888888"
                    d="M0,0v455h455V0H0z M384.814,100.68l-53.458,257.136
		                                c-1.259,6.071-8.378,8.822-13.401,5.172l-72.975-52.981c-4.43-3.217-10.471-3.046-14.712,0.412l-40.46,32.981
		                                -4.695,3.84-11.771,1.7-13.569-4.083l-28.094-90.351l-72.583-27.089c-7.373-2.762-7.436-13.171-0.084-16.003L373.36,90.959
		                                C379.675,88.517,386.19,94.049,384.814,100.68z"
                  />
                  <path
                    fill="#888888"
                    d="M313.567,147.179l-141.854,87.367c-5.437,3.355-7.996,9.921-6.242,16.068
		                                l15.337,53.891c1.091,3.818,6.631,3.428,7.162-0.517l3.986-29.553c0.753-5.564,3.406-10.693,7.522-14.522l117.069-108.822
		                                C318.739,149.061,316.115,145.614,313.567,147.179z"
                  />
                </g>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <form className={styles.form} action="#">
        <p className={styles.formp}>Получайте наши новости и обновления</p>

        <input
          type="email"
          className={styles.formemail}
          placeholder="Email Address"
        ></input>
        <button className={styles.formbutton}>Подписаться</button>
      </form>
    </footer>
  );
};

export default Footer;
