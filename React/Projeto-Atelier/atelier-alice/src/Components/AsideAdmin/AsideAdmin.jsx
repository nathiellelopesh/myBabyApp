import { BsBoxSeam } from "react-icons/bs";
import { BsCart2 } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import styles from './style.module.css'

export default function AsideAdmin({allProducts, soldProducts, orders, schedule}) {
    return (
        <aside>
                <div>
                    <BsBoxSeam onClick={allProducts} color="#fff" size={"2.4rem"}/>
                    <p>Gerenciar Produtos</p>
                </div>
                <div>
                    <BsCart2 onClick={soldProducts} color="#fff" size={"2.4rem"}/>
                    <p>Vendidos</p>
                </div>
                <div>
                    <FiEdit onClick={orders} color="#fff" size={"2.4rem"}/>
                    <p>Pedidos</p>
                </div>
                <div>
                    <FaRegCalendarAlt onClick={schedule} color="#fff" size={"2.4rem"}/>
                    <p>Agenda</p>
                </div>
            </aside>
    )
}