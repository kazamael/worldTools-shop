import React from "react";

import {BigImage} from "./bigImage";
import './style.scss'
import {Link} from "react-router-dom";



export class DescriptionProduct extends React.Component {
    state = {
        img: 0,
        big: false
    };

    handleImgClick = (el) => {
        const number = this.props.clickedProduct[0].urls.indexOf(el);
        this.setState({
            img: number
        })


    };

    handlePrevClick = () => {
        if(this.state.img > 0){
            this.setState({
                img:this.state.img-1
            })
        } else {
            this.setState({
                img: this.props.clickedProduct[0].urls.length-1
            })
        }
    };

    handleNextClick = () => {
        if(this.state.img < 2 ){
            this.setState({
                img:this.state.img+1
            })
        } else {
            this.setState({
                img:0
            })
        }
    };

    handleBigImageClick = () => {
        this.setState({
            big: true
        })
    };

    handleMinImageClick = () => {
        this.setState({
            big: false
        })
    }

    render() {
        const {img, big} = this.state;
        const {clickedProduct, handleBackClick, handleBuyClick,cart} = this.props;


        return (
            <>
                {big &&
                <BigImage
                    handleNextClick={this.handleNextClick}
                    handleMinImageClick={this.handleMinImageClick}
                    handlePrevClick={this.handlePrevClick}
                    img={img}
                    clickedProduct={clickedProduct}
                />}
                <div className="description_back">
                    {cart !== 0 && <button className="cart_button"><Link className="nav_item_link2" to="/cart">+{cart}</Link></button>}
                    <section className="container">
                        <article className="description_content">
                            <div className="description_images">
                                <div className="description_main_image">
                                    <img onClick={this.handleBigImageClick} src={clickedProduct[0].urls[img]} alt=""/>
                                </div>
                                <div className="description_side_images">
                                    {clickedProduct[0].urls.map(el => <img onClick={this.handleImgClick.bind(this, el)}
                                                                           className="description_side_image" key={el}
                                                                           src={el} alt=""/>)}
                                </div>
                            </div>
                            <div className="description_description">
                                <div className="description_data">
                                    <h1 className="description_name">{clickedProduct[0].name}</h1>
                                    <span className="description_brand">{clickedProduct[0].brand}</span>
                                    <span className="description_price">{clickedProduct[0].price}zł</span>
                                </div>
                                <p className="description_text">{clickedProduct[0].description}</p>
                                <div className="description_buttons">
                                    <button className="description_button" onClick={handleBackClick}>wróć na stronę
                                    </button>
                                    <button className="description_button"
                                            onClick={handleBuyClick.bind(this, clickedProduct[0].id)}>kup
                                    </button>
                                </div>
                            </div>
                        </article>
                    </section>
                </div>
            </>
        )
    }
}