import {Link} from "react-router-dom";
import React from "react";

export const BackToShopping = (props) => {
    const {handleBackClick} = props;
    return (
        <div className="back_back">
            <section className="container">
                <div className="back_content">
                    <h1>dziękujemy za zamówienie</h1>
                    <Link onClick={handleBackClick} className="back_link" to="/products">Wróć do zakupów</Link>
                </div>
            </section>
        </div>
    )
};