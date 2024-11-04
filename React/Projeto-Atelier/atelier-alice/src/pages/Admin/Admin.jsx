import AsideAdmin from "../../Components/AsideAdmin/AsideAdmin";
import Product from "../../Components/Product/Product";
import ProductList from "../../Components/ProductList/ProductList";
import styles from './style.module.css'

export default function Admin() {
    return (
        <section className={styles.adminContainer}>
            <AsideAdmin/>
            <section className={styles.adminContent}>
                <ProductList/>
            </section>
        </section>
    )
}