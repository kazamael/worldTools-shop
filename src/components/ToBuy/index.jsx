import React from "react";


import {Box} from "./Box";
import {Confirm} from "./Confirm";
import {BackToShopping} from "./BackToShopping";
import './style.scss'
import {idd} from "../Product";
import * as firebase from "firebase";


class ToBuy extends React.Component {

    state = {
        toBuyItems: [],
        ids: [],
        buy: false,
        confirmation: false,
        data: {},
        nameSurname: "",
        address: "",
        id: 1
    };

    componentDidMount() {

        firebase.database().ref('orders/0/').on('value', snapshot => {
            const ordersObject = snapshot.val();
            if (ordersObject.order !== undefined) {
                const ordersList = Object.keys(ordersObject.order).map(key => ({
                    ...ordersObject.order[key],
                    uid: key,
                }));
                ordersList.map(el => {
                    this.setState({
                        toBuyItems: ordersList
                    })
                })
            }
        })

    }




    handlePlusClick = (id) => {
        const finder=this.state.toBuyItems.find(el=> el.id===id)
        firebase.database().ref('orders/0/order/'+id).update({
            quantity:finder.quantity+1
        })
    };

    handleMinusClick = (id) => {
        const finder = this.state.toBuyItems.find(el => el.id === id)
        if (finder.quantity > 1) {
        firebase.database().ref('orders/0/order/' + id).update({
            quantity: finder.quantity - 1
        })
    }


    };

    handleDeleteClick = (id) => {
        console.log(id);
        firebase.database().ref('orders/0/order/' + id).remove()
        if(this.state.toBuyItems.length<=1)
        {window.location.reload()}

    };

    handleKupClick = () => {
        this.setState({
            buy: true
        })
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmitClick = (e) => {
        e.preventDefault()

        firebase.database().ref('orders/0/').update({
            orderOwner: this.state.nameSurname,
            address: this.state.address
        }).then(() => this.setState({
            confirmation: true
        }))

    };

    handleBackClick = () => {
        firebase.database().ref('orders/0/order/').remove()
    };

    render() {
        const {toBuyItems, buy, confirmation} = this.state;
        if (!buy) {

            return (
                <Box
                    toBuyItems={toBuyItems}
                    handlePlusClick={this.handlePlusClick}
                    handleMinusClick={this.handleMinusClick}
                    handleDeleteClick={this.handleDeleteClick}
                    handleKupClick={this.handleKupClick}/>
            )


        } else if (!confirmation) {
            return (
                <Confirm
                    toBuyItems={toBuyItems}
                    handleSubmitClick={this.handleSubmitClick}
                    handleInputChange={this.handleInputChange}
                    nameSurname={this.state.nameSurname}
                    address={this.state.address}
                />
            )

        } else {
            return (
                <BackToShopping handleBackClick={this.handleBackClick}/>
            )
        }
    }
}


export default ToBuy;