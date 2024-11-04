import Filter from '../Filter/Filter'
import Product from '../Product/Product'
import axios from 'axios'
import './productList.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function ProductList() {
    const [productsList, setProductsList] = useState([])

    async function getProducts() {
        try {
            const response = await axios.get("http://localhost:3000/atelier");
            console.log(response.data)
            setProductsList(response.data);
            
          } catch (error) {
            alert("Erro ao buscar dados");
          }
    }

    useEffect(() => {
        getProducts();
        
    }, []);
    
    return (
        <section className='productList-container'>

            <Filter/>
            
            <div className='productList-items'>
            {productsList.map((product) => (
                <Link key={product.id} to={`/produto/${product.id}`}>
                    <Product image={product.images[0]} title={product.title} price={product.price} category={product.size}/>
                </Link>
            ))}
            </div>
            
        </section>
    )
}