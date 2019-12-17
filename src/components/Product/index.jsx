import React from "react";

import {MainProduct} from "./mainProducts";
import {DescriptionProduct} from "./description";
import * as firebase from "firebase";

let done = false;

class Product extends React.Component {

    state = {
        products: [],
        clickedProduct: [],
        cart: 0,
        id: 1

    };

    componentDidMount() {

        firebase.database().ref('tools/').on('value', snapshot => {
            const toolsObject = snapshot.val();
            const toolsList = Object.keys(toolsObject).map(key => ({
                ...toolsObject[key],
                uid: key,
            }));

                this.setState({
                    products: toolsList
                })
        })
        firebase.database().ref('orders/0/').on('value', snapshot => {
            const ordersObject = snapshot.val();
            if (ordersObject.order !== undefined) {
                const ordersList = Object.keys(ordersObject.order).map(key => ({
                    ...ordersObject.order[key],
                    uid: key,
                }));
                this.setState({
                    cart:ordersList.length
                })
            }
        })

    };




    handleButtonClick = (id) => {
        const givenElement = this.state.products.find(el => el.id === id);

        firebase.database().ref('orders/0/').on('value', snapshot => {
            const ordersObject = snapshot.val();
            if (ordersObject.order === undefined) {
                this.setState({
                    cart: this.state.cart + 1
                });
                firebase.database().ref('orders/0/order/' + givenElement.id).set({
                    brand: givenElement.brand,
                    description: givenElement.description,
                    id: givenElement.id,
                    name: givenElement.name,
                    price: givenElement.price,
                    quantity: 1,
                    urls: givenElement.urls
                });


            } else {

                const orderList = Object.keys(ordersObject.order).map(key => ({
                    ...ordersObject.order[key],
                    uid: key,
                }));
                const finder = orderList.find(el => el.id === id);
                if (finder === undefined) {
                    this.setState({
                        cart: this.state.cart + 1
                    });
                    firebase.database().ref('orders/0/order/' + givenElement.id).set({
                        brand: givenElement.brand,
                        description: givenElement.description,
                        id: givenElement.id,
                        name: givenElement.name,
                        price: givenElement.price,
                        quantity: 1,
                        urls: givenElement.urls
                    });
                }
            }


        })
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
