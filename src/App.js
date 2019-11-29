import React from 'react';
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import Header from "./components/Header";
import MainBody from "./components/MainBody";
import Product from "./components/Product";
import ToBuy from "./components/ToBuy";
import Contact from "./components/Contact/idex";

function App() {

    return (
        <Router>
            <Header/>
            <Route exact path="/" component={MainBody}/>
            <Route path="/products" component={Product}/>
            <Route path="/cart" component={ToBuy}/>
            <Route path="/contact" component={Contact}/>
        </Router>
    )
}

export default App;
