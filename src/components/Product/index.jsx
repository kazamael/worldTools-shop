import React from "react";

import {MainProduct} from "./mainProducts";
import {DescriptionProduct} from "./description";

let done = false;

class Product extends React.Component {
    state = {
        products: [],
        clickedProduct: [],
        cart: 0,
        id: 1

    };

    componentDidMount() {
        const URL = `http://localhost:3000/tools`;
        fetch(URL)
            .then(data => data.json())
            .then(tools =>
                tools.map(el => {
                    this.setState({
                        products: [...this.state.products, el]
                    })
                })
            )
            .catch(error => console.log(error));
    };

    handleButtonClick = (id) => {
        const givenElement = this.state.products.find(el => el.id === id);
        this.setState({
            cart: this.state.cart + 1
        });
        const URL = `http://localhost:3000/orders/${this.state.id}`;
        givenElement.quantity = 1;
        fetch(URL)
            .then(data => data.json())
            .then(data => {
                    const finder = data.order.find(el => el.id === id)
                    if (finder) {
                        finder.quantity = finder.quantity + 1
                    }
                    {
                        !finder ?
                            fetch(URL, {
                                method: "PATCH",
                                body: JSON.stringify({order: [...data.order, givenElement]}),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }) :
                            fetch(URL, {
                                method: "PATCH",
                                body: JSON.stringify({order: [...data.order]}),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                    }
                }
            );
    };


    handleProductClick = (id) => {
        const givenElement = this.state.products.find(el => el.id === id);
        this.setState({
            clickedProduct: [...this.state.clickedProduct, givenElement]
        })

    };

    handleBackClick = () => {
        this.setState({
            clickedProduct: []
        })
    };


    render() {
        const {products, clickedProduct, cart} = this.state;
        if (products.length < 1) {
            return null;

        } else {
            if (clickedProduct.length < 1) {
                return (
                    <MainProduct
                        cart={cart}
                        products={products}
                        handleProductClick={this.handleProductClick}
                        handleButtonClick={this.handleButtonClick}
                    />
                )

            } else {
                return (
                    <DescriptionProduct
                        cart={cart}
                        products={products}
                        clickedProduct={clickedProduct}
                        handleBackClick={this.handleBackClick}
                        handleBuyClick={this.handleButtonClick}
                    />
                )
            }
        }

    }
}


export default Product;
