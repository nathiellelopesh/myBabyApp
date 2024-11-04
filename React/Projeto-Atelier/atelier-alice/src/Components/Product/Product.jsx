import { FaWhatsapp } from "react-icons/fa";

import './product.css'

export default function Product(props) {
    return (
        <div className='product-item'>
            <img src={props.image}/>
            <div className='product-item-description'>
                <div className='product-item-description-title'>
                    <p className='product-item-title'>{props.title}</p>
                    <p>Tam {props.category}</p>
                </div>
                
                <p>R$ {props.price}</p>
            </div>
            <button><FaWhatsapp />Comprar</button>
        </div>
    )
}