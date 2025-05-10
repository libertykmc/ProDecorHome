import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
// import MainPage from "./components/MainPage/MainPage";

function App() {
    return (
        <div className={styles.mainContainer}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default App;
