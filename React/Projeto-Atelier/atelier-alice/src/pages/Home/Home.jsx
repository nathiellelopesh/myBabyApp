import Header from '../../Components/Header/Header'
import ProductList from '../../Components/ProductList/ProductList'
import './home.css'

export default function Home() {
    return (
        <>
        
        <Header />
        <section className='home-banner-container'>
            <div className='home-banner'>
                <h2>Encontre aqui seu vestido de Alta Costura</h2>
            </div>
        </section>
        <section className='home-productList'>
            <h3>Disponíveis para venda</h3>
            <ProductList/>
        </section>
        
        </>
    )
}