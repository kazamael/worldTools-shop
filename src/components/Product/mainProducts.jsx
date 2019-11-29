import React from "react";

import './style.scss'
import {Link} from "react-router-dom";

export const MainProduct = props => {
    const {products, handleButtonClick, handleProductClick, cart} = props;
    return (
        <div className="mainProduct_back">
            {cart !== 0 && <button className="cart_button"><Link className="nav_item_link2" to="/cart">+{cart}</Link></button>}

            <div className="container">
                <section className="products_section">
                    {products.map(el => (
                        <div className="single_product" key={el.id}>
                            <div className="product_content_outer">
                                <div className="product_content" onClick={handleProductClick.bind(this, el.id)}>
                                    <h1>{el.name}</h1>

                                    <h2>{el.brand}</h2>
                                    <h1><strong>{el.price} zł</strong></h1>

                                </div>
                                <button onClick={handleButtonClick.bind(this, el.id)}>Kup</button>
                            </div>
                            <div className="product_img">
                                <img onClick={handleProductClick.bind(this, el.id)} src={el.urls[0]} alt=""/>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    )
}