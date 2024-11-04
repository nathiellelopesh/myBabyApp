import { useParams } from 'react-router-dom'
import axios from 'axios'
import styles from './style.module.css'
import { useEffect, useState } from 'react'
import { FaWhatsapp } from "react-icons/fa";


export default function ProductDetails() {
    const { id } = useParams()

    const [productInfo, setProductInfo] = useState(null)
    const [picture, setPicture] = useState("")
    

    async function getItem() {
        try {
            const response = await axios.get(`http://localhost:3000/atelier/produto/${id}`);
            setProductInfo(response.data)
            console.log(response.data)
        } catch (error) {
            console.log("erro ao carregar produto")
        }
    }

    useEffect(() => {
        getItem();
        
    }, []);

    if (!productInfo) {
        return <div>Carregando...</div>;
    }

    const { title, price, description, images } = productInfo;

    const pixPayment = Math.floor(price * 0.90);

    

    return (
        <section>

            <div className={styles.ProductInformation}>
                
                <div className={styles.imagesProduct}>
                    <div className={styles.smallImg}>
                        {images.map(image => (
                            <img src={image} onClick={() => setPicture(image)}/>
                        ))}
                    </div>
                    <img src={picture ? picture : images[0]} className={styles.bigImg}/>
                </div>

                <div className={styles.details}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.description}>{description}</p>
                    <p className={styles.price}>R$ {price}</p>
                    
                    <p>à vista no Pix ou Dinheiro com 10% off: R$ <span className={styles.pix}>{pixPayment}</span></p>
                    <button><FaWhatsapp />Comprar</button>
                </div>
            </div>

            
        </section>
    )
}

