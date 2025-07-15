import styles from "./index.module.css"
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from 'lucide-react';

export default function NotFound(){
    const navigate = useNavigate();
    return(
        <>
        <div className={styles.App}>
            <div className={styles.center}>
                <Header/>
                <div className={styles.mainBlock}>
                    <div className={styles.mainContent}>
                        <div className={styles.NotFoundCard}>
                            <div className={styles.NotFoundContent}>
                                <div className={styles.NotFoundText}>
                                    <p className={styles.Title}>
                                        Error 404 <span>.</span>
                                    </p>
                                    <p className={styles.Text}>
                                        Oops, something went wrong! The page was unfortunately not found. Please check if the searched url is correct.
                                    </p>
                                </div>
                                <div className={styles.HomeButton} onClick={()=>navigate("/")}>
                                    <p>Home</p>
                                    <ChevronRight/>
                                </div>
                            </div>
                            <div className={styles.NotFoundImage} >
                            <img src="/assets/pika.png " alt="" /></div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
        </>
    )
}