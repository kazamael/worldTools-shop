import React from "react";


import {Box} from "./Box";
import {Confirm} from "./Confirm";
import {BackToShopping} from "./BackToShopping";
import './style.scss'
import {idd} from "../Product";


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


        const URL = `http://localhost:3000/orders/${this.state.id}`;
        fetch(URL)
            .then(data => data.json())
            .then(data => this.setState({
                    toBuyItems: data.order
                })
            );
    }

    handlePlusClick = (id) => {
        const URL = `http://localhost:3000/orders/${this.state.id}`;
        fetch(URL)
            .then(data => data.json())
            .then(data => {
                    const finder = data.order.find(el => el.id === id)
                    finder.quantity = finder.quantity + 1
                    this.setState({
                        toBuyItems: data.order
                    })
                    fetch(URL, {
                        method: "PATCH",
                        body: JSON.stringify({order: [...data.order]}),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                }
            );
    };

    handleMinusClick = (id) => {


        const URL = `http://localhost:3000/orders/${this.state.id}`;
        fetch(URL)
            .then(data => data.json())
            .then(data => {
                    const finder = data.order.find(el => el.id === id)
                    if (finder.quantity > 0) {
                        finder.quantity = finder.quantity - 1
                        this.setState({
                            toBuyItems: data.order
                        })
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

    handleDeleteClick = (id) => {

        const URL = `http://localhost:3000/orders/${this.state.id}`;
        fetch(URL)
            .then(data => data.json())
            .then(data => {
                    const finder = data.order.find(el => el.id === id)
                    const slicer = data.order.indexOf(finder);
                    const withoutDeleted = data.order
                    withoutDeleted.splice(slicer, 1)
                    this.setState({
                        toBuyItems: withoutDeleted
                    })

                    fetch(URL, {
                        method: "PATCH",
                        body: JSON.stringify({order: withoutDeleted}),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                }
            );


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
        const URL = `http://localhost:3000/orders/${this.state.id}`;
        fetch(URL, {
            method: "PATCH",
            body: JSON.stringify({
                orderOwner: this.state.nameSurname,
                address: this.state.address
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => this.setState({
            confirmation: true
        }))

    };

    handleBackClick =()=>{
        const URL = `http://localhost:3000/orders/${this.state.id}`;
        fetch(URL, {
            method: "PATCH",
            body: JSON.stringify({
                orderOwner:"",
                address:"",
                order:[],
            }),
            headers: {
                'Content-Type': 'application/json'
            }
    })
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