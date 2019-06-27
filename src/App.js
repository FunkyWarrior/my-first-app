import React from 'react';
import {connect} from 'react-redux'
import {Switch, Route} from "react-router-dom";

import {getData} from "./store/app/actions";
import {getUsers} from "./store/auth/actions";

import About from "./components/Pages/About";
import Contacts from "./components/Pages/Contacts";
import Reviews from "./components/Pages/Reviews";

import Header from './components/Header'
import Footer from './components/Footer'
import ShadowBox from './components/ShadowBox'

import ProductsContainer from "./components/Products/ProductsContainer"
import CartContainer from "./components/Cart/CartContainer"
import OrdersContainer from "./components/Orders/OrdersContainer";
import AuthContainer from "./components/Auth/AuthContainer";
import RegistrationContainer from "./components/Registration/RegistrationContainer";
import UserPageContainer from "./components/UserPage/UserPageContainer";

export class App extends React.Component {

    componentDidMount () {
        this.props.getData('services','dataServices');
        this.props.getUsers('users','dataUsers');
        this.props.getData('orders','dataOrders');
    };

     render () {
         console.log('hi')
          return (
            <>
                <Header  />
                <div className='outer'>
                    <Switch>
                        <Route path='/products/' render={(props)=><ProductsContainer {...props}/>} />
                        <Route exact path={`/user/${this.props.auth.currentUser.id}/orders`} component={OrdersContainer} />
                        <Route exact path='/' component={About} />
                        <Route exact path='/contacts' component={Contacts} />
                        <Route exact path='/reviews' component={Reviews} />
                        {this.props.auth.currentUser.root ? <Route exact path='/info/user/:id' component={UserPageContainer} /> : null}
                    </Switch>
                </div>
                <Footer />
                {this.props.auth.showShadow && <ShadowBox />}
                {this.props.auth.showAuthForm && <AuthContainer />}
                {this.props.auth.showRegForm && <RegistrationContainer regNewUser={this.regNewUser} />}
                {this.props.app.cartArray.length !== 0 && <CartContainer buy={this.pushOrder} more={this.moreProduct} less={this.lessProduct} deleteP={this.deleteProduct}/>}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        app:state.app,
        auth:state.auth,
        reg:state.registration
    }
};

const mapDispatchToProps = {
    getData,
    getUsers
};

export default connect (mapStateToProps,mapDispatchToProps)(App)
