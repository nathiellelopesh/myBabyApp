import manequim from '../../img/logo.png';
import './header.css'

export default function Header() {
    return (
        <header>
            <div className='header-title'>
                <img src={manequim}/>
                <p>ATELIER ALICE</p>
            </div>
            <div>
                <nav className='header-nav'>
                    <a>HOME</a>
                    <a>CATALOGO DE VESTIDOS</a>
                    <a>ORÇAMENTO</a>
                    <a>CONTATO</a>
                </nav>
            </div>
        </header>
    )
}