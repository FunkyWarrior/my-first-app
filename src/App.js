import React from 'react';
import {connect} from 'react-redux'
import {Switch, Route} from "react-router-dom";

import {getData, setDataApp} from "./store/app/actions";
import {getUsers} from "./store/auth/actions";

import About from "./components/Pages/About";
import Contacts from "./components/Pages/Contacts";
import Reviews from "./components/Pages/Reviews";

import Header from './components/Header/Header'
import Footer from './components/Footer'
import ShadowBox from './components/ShadowBox'
import Alert from './components/Alert'

import ProductsContainer from "./components/Products/ProductsContainer"
import CartContainer from "./components/Cart/CartContainer"
import OrdersContainer from "./components/Orders/OrdersContainer";
import AuthReg from "./components/Auth-Reg/Auth-Reg";
import UserPageContainer from "./components/UserPage/UserPageContainer";
import {Redirect} from "react-router";
import Modal from "./components/Modal";



export class App extends React.Component {

    componentWillUpdate(nextProps, nextState, nextContext) {
        localStorage.setItem('dataServices',JSON.stringify(nextProps.app.dataServices));
    }

    componentDidMount () {
        if (!localStorage.getItem('dataServices')) {
            this.props.getData('services','dataServices');
        }

        this.props.getData('orders','dataOrders');
        this.props.getUsers('users','dataUsers')
    };

     render () {
         const {app,auth} = this.props;
          return (
            <>
                <Header  />
                <div className='outer'>
                    <Switch>
                        <Route exact path='/products/:id' component={ProductsContainer} />
                        <Route exact path={`/user/${auth.currentUser.id}/orders`} component={OrdersContainer} />
                        <Route exact path='/' component={About} />
                        <Route exact path='/contacts' component={Contacts} />
                        <Route exact path='/reviews' component={Reviews} />
                        {auth.currentUser.root ? <Route exact path='/info/user/:id' component={UserPageContainer} /> : null}
                        <Redirect from='*' to='/'/>
                    </Switch>
                </div>
                <Footer />
                {auth.showShadow && <ShadowBox />}
                {(auth.showAuthForm || auth.showRegForm) && <AuthReg />}
                {(app.cartArray.length !== 0 && auth.currentUser.id !== 0) && <CartContainer buy={this.pushOrder} more={this.moreProduct} less={this.lessProduct} deleteP={this.deleteProduct}/>}
                {(auth.alert || app.alert) && <Alert />}
                {(app.currentModal || auth.showChangeUser )&& <Modal />}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        app:state.app,
        auth:state.auth,

    }
};

const mapDispatchToProps = {
    getData,
    getUsers,
    setDataApp
};

export default connect (mapStateToProps,mapDispatchToProps)(App)

