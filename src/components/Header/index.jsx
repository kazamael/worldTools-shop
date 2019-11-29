import React from "react";
import { Link } from 'react-router-dom';

import './style.scss'


const Header = () => {

    return (
        <div className="header_back">
        <header className="container header">

                <div className="logo">
                <Link className="logo" to="/">
                    <h1 className="logoMain">World Tools</h1>
                    </Link>
                </div>
                <nav>
                    <ul className="nav">
                        <li className="nav_item"><Link className="nav_item_link" to="/products">Produkty</Link></li>
                        <li className="nav_item"><Link className="nav_item_link" to="/cart">Koszyk</Link></li>
                        <li className="nav_item"><Link className="nav_item_link" to="/contact">Kontakt</Link></li>
                    </ul>
                </nav>


        </header>
        </div>


    )

};


export default Header;