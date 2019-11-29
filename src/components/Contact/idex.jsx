import React from "react";

import './style.scss'

const Contact = () => {
    return (
        <div className="contact_back">
            <section className="container">
                <div className="contact_content">
                    <h1 className="contact_title">dane kontaktowe</h1>
                    <ul className="contact_data">
                        <li className="contact_number">numer:222 222 222</li>
                        <li className="contact_name">email: 222@22.2</li>
                        <li className="contact_address">adres: daleko 2/2 02-222 BardzoDaleko</li>
                    </ul>
                </div>
            </section>
        </div>
    )
};


export default Contact;