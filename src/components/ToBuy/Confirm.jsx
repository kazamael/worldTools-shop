import React from "react";

export const Confirm = props => {
    const {toBuyItems, handleSubmitClick, handleInputChange, nameSurname, address} = props;
    return (
        <div className="confirmation_back">
            <section className="container">
                <article className="confirmation_content">
                    <div className="confirm_data">
                        <h2>podsumowanie zamówienia</h2>
                        <h3>zamówione przedmioty:</h3>
                        {toBuyItems.map(el => (
                            <span key={el.id}>{el.name}:{el.quantity},  </span>
                        ))}
                        {toBuyItems.length > 0 && <h4>Cena razem: {
                            toBuyItems
                                .map(el => el.price * el.quantity)
                                .reduce(function (el1, el2) {
                                    return el1 + el2
                                })}</h4>}
                    </div>
                    <form className="confirm_form" onSubmit={handleSubmitClick} action="">
                        <input onChange={handleInputChange} type="text" name="nameSurname"
                               value={nameSurname} placeholder="imie i nazwisko"/><br/>
                        <input onChange={handleInputChange} type="text" name="address" value={address}
                               placeholder="adres"/><br/>
                        <input type="submit" value="potwierdź i kup"/>
                    </form>
                </article>
            </section>
        </div>
    )
};