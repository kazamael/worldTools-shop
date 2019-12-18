import React from "react";

import {MainProduct} from "./mainProducts";
import {DescriptionProduct} from "./description";
import * as firebase from "firebase";

import { connect } from "react-redux";
import { cartFetched } from "../Actions";
import {productFetched} from "../Actions";

class Product extends React.Component {

    state = {
        clickedProduct: []

    };

    componentDidMount() {

        firebase.database().ref('tools/').on('value', snapshot => {
            const toolsObject = snapshot.val();
            const toolsList = Object.keys(toolsObject).map(key => ({
                ...toolsObject[key],
                uid: key,
            }));

                this.props.productFetched(toolsList)
        });
        firebase.database().ref('orders/0/').on('value', snapshot => {
            const ordersObject = snapshot.val();
            if (ordersObject.order !== undefined) {
                const ordersList = Object.keys(ordersObject.order).map(key => ({
                    ...ordersObject.order[key],
                    uid: key,
                }));
                this.props.cartFetched(ordersList)
            }
        })

    };



    handleButtonClick = (id) => {
        const givenElement = this.props.product.find(el => el.id === id);

        firebase.database().ref('orders/0/').on('value', snapshot => {
            const ordersObject = snapshot.val();
            if (ordersObject.order === undefined) {
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
        const givenElement = this.props.product.find(el => el.id === id);
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
        const {cart,product} = this.props;
        const {clickedProduct} = this.state;
        if (product.length < 1) {
            return null;

        } else {
            if (clickedProduct.length < 1) {
                return (
                    <MainProduct
                        cart={cart}
                        products={product}
                        handleProductClick={this.handleProductClick}
                        handleButtonClick={this.handleButtonClick}
                    />
                )

            } else {
                return (
                    <DescriptionProduct
                        cart={cart}
                        products={product}
                        clickedProduct={clickedProduct}
                        handleBackClick={this.handleBackClick}
                        handleBuyClick={this.handleButtonClick}
                    />
                )
            }
        }

    }
}


const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        product:state.product // (1)
    }
};
const mapDispatchToProps = { cartFetched, productFetched }; // (2)

const ProductContainer = connect(mapStateToProps, mapDispatchToProps)(Product); // (3)


export default ProductContainer;
