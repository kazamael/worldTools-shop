import React from "react";

export const Box = props => {
    const {toBuyItems, handlePlusClick, handleMinusClick, handleDeleteClick, handleKupClick} = props;
    if (toBuyItems == undefined) {
        return null;
    }
    return (
        <div className="box_back">
            <section className="container">
                <article className="box">
                    <h1 className="box_title">Twoje produkty</h1>
                    <div className="box_products">
                        {toBuyItems.map(el => (
                            <div className="box_product" key={el.id}>
                                <div className="box_product_info">
                                    <h1>{el.name}</h1>
                                    <span>ilość:{el.quantity}</span>
                                    <span>cena: {el.price} zł</span>
                                </div>
                                <div className="box_product_buttons">
                                    <button onClick={handlePlusClick.bind(this, el.id)}>+</button>
                                    <button onClick={handleMinusClick.bind(this, el.id)}>-</button>
                                    <button onClick={handleDeleteClick.bind(this, el.id)}>usuń</button>
                                </div>

                            </div>
                        ))}
                    </div>
                    <div className="box_summary">
                        {toBuyItems.length > 0 && <h2>Cena razem: {
                            toBuyItems
                                .map(el => el.price * el.quantity)
                                .reduce(function (el1, el2) {
                                    return el1 + el2
                                })} zł</h2>}

                        <h1>
                            <button onClick={handleKupClick}>Kup</button>
                        </h1>
                    </div>
                </article>
            </section>
        </div>

    )
};

