import React from 'react';
import {connect} from 'react-redux'
import {Switch, Route} from "react-router-dom";
import {
    setCurrentUser,
    setDataOrders,
    setDataServices,
    setDataUsers,
    setCartArray,
    setCartGroup,
    setCartSum
} from "./store/app/actions";

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
    constructor(props) {
        super(props);
        this.state = {
            moreInfo:false,
            showShadow: false,
            showLog:false,
            showReg:false,
            showUserForm:false,
            showCart:false,
        };
        this.counter = 1
    }

    checkUser = (e) => {
        const user = this.props.app.dataUsers.find(u => u.email === this.props.auth.authForm[0].value);
        if(user){
            if(user.password === this.props.auth.authForm[1].value){
                this.props.setCurrentUser(user);
                this.showLog();
                this.showShadow();
                this.setState({showUserForm:!this.state.showUserForm})

            }else alert('Password doesnt match')
        }else alert('Email doesnt match');
        e.preventDefault()
    };

    regNewUser =  (event) => {
        let some = true;
        // eslint-disable-next-line array-callback-return
        this.props.app.dataUsers.map(u => {
            if (u.email === this.props.reg.regForm[2].value){
                alert('Email already taken');
                some=false;
            }
        });
        if (some) {
            if (!(this.props.reg.regForm[5].value === this.props.reg.regForm[6].value)){
                alert('Password doesnt match');
                some=false;
            }
        }
        if (some) {
            let dataArray = this.props.app.dataUsers.slice();
            dataArray.push(
                {
                    name:`${this.props.reg.regForm[0].value}`,
                    lastName:`${this.props.reg.regForm[1].value}`,
                    email:`${this.props.reg.regForm[2].value}`,
                    id:this.props.app.dataUsers[this.props.app.dataUsers.length-1].id + 1,
                    phone:`${this.props.reg.regForm[3].value}`,
                    avatarUrl:`${this.props.reg.regForm[4].value}`,
                    regDate:new Date().toLocaleString(),
                    password:`${this.props.reg.regForm[5].value}`,
                    root:false,
                }
            );
            fetch('https://boris-first-app.firebaseio.com/users.json', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataArray)
            });
            this.props.setCurrentUser(
                    {
                        name:`${this.props.reg.regForm[0].value}`,
                        lastName:`${this.props.reg.regForm[1].value}`,
                        email:`${this.props.reg.regForm[2].value}`,
                        id:this.props.app.dataUsers[this.props.app.dataUsers.length-1].id + 1,
                        phone:`${this.props.reg.regForm[3].value}`,
                        avatarUrl:`${this.props.reg.regForm[4].value}`,
                        regDate:new Date().toLocaleString(),
                        password:`${this.props.reg.regForm[5].value}`,
                        root:false,
                    }
            );
            this.showShadow();
            this.setState({showUserForm:!this.state.showUserForm});
            this.setState({showReg:!this.state.showReg});
            this.setState({showShadow:!this.state.showShadow});
        }
        event.preventDefault();
    };

    addToCart = (e) => {
        if (this.props.app.currentUser) {
            const that = e.target.parentElement.parentElement.parentElement.id;
            const group = e.target.name;
            this.props.setCartGroup(group);
            const product = this.props.app.dataServices[`${group}`].find(s => s.id === Number(that));
            const arr = this.props.app.cartArray.slice();
            const check = arr.find(c => (c.productId === product.id && c.group === product.group));
            if (check) {
                check.count++
            } else {
                arr.push({
                    group: group,
                    productId: product.id,
                    count: 1,
                    id: this.counter
                });
                this.counter++
            }
            this.props.setCartArray(arr);
            this.props.setCartSum(this.props.app.cartSum + product.price);
            this.setState({showCart: true});
        } else {
            alert('Please Log In')
        }
    };

    moreProduct = (e) => {
        const that = e.target.parentElement.parentElement.id;
        const group = e.target.name;
        const arr = this.props.app.cartArray.slice();
        const price = this.props.app.dataServices[`${group}`].find(el => el.id === Number(that));
        const product = arr.find(el => el.productId === Number(that) && el.group === group);
        product.count++;
        this.props.setCartSum(this.props.app.cartSum + price.price);
        this.props.setCartArray(arr);

    };

    lessProduct =(e) => {
        const that = e.target.parentElement.parentElement.id;
        const group = e.target.name;
        const arr = this.props.app.cartArray.slice();
        const price = this.props.app.dataServices[`${group}`].find(el => el.id === Number(that));
        // eslint-disable-next-line array-callback-return
        arr.map(product => {
            if (product.productId === Number(that) && product.group === group){
                product.count--;
                this.props.setCartSum(this.props.app.cartSum - price.price);
            }
            if (product.count === 0) arr.splice(arr.indexOf(product),1);
            if (arr.length === 0) {
                this.setState({showCart:false});
                this.counter = 1
            }
        });
        this.props.setCartArray(arr);

    };

    deleteProduct = (e) => {
        const that = e.target.parentElement.parentElement.id;
        const group = e.target.name;
        const arr = this.props.app.cartArray.slice();
        const price = this.props.app.dataServices[`${group}`].find(el => el.id === Number(that));
        // eslint-disable-next-line array-callback-return
        arr.map(product => {
            if (product.productId === Number(that) && product.group === group){
                arr.splice(arr.indexOf(product),1);
                this.props.setCartSum(this.props.app.cartSum - (price.price*product.count));
            }
            if (arr.length === 0) {
                this.setState({showCart:false});
                this.counter = 1
            }
        });
        if (arr.length === 0) {
            this.setState({showCart:false});
            this.counter = 1
        }
        this.props.setCartArray(arr);
    };

    pushOrder = () => {
        let dataArray = this.props.app.dataOrders.slice();
        dataArray.push(
            {
                userId: this.props.app.currentUser.id,
                status:'pending',
                totalSum:this.props.app.cartSum,
                date:new Date().toLocaleString(),
                id:this.props.app.dataOrders[this.props.app.dataOrders.length-1].id + 1,
                order: this.props.app.cartArray
            }
        );
        fetch('https://boris-first-app.firebaseio.com/orders.json', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataArray)
        });
        this.props.setCartArray([]);
        this.props.setCartSum(0);
        this.props.setCartGroup('');
        this.setState({showCart:false});
        this.componentDidMount()
    };

    showLog = () => {
        this.setState({ showLog: !this.state.showLog });
        this.showShadow()
    };

    showReg = () => {
        this.setState({ showReg: !this.state.showReg });
        this.showShadow();
    };

    showMoreInfo =() => {
        this.setState({moreInfo: !this.state.moreInfo});
    };

    clearShadow =() => {
        this.setState({showShadow: (!(this.state.showShadow && !this.state.moreInfo))});
        this.setState({showLog:this.state.showLog ? false : null});
        this.setState({showReg:this.state.showReg ? false : null});
    };

    showShadow = () => this.setState({ showShadow: !this.state.showShadow });

    componentDidMount () {
        fetch(`https://boris-first-app.firebaseio.com/.json`)
            .then(response => response.json())
            .then(result => {
                this.props.setDataUsers(result.users);
                this.props.setDataServices(result.services);
                this.props.setDataOrders(result.orders);
            })
    };

     render () {
          return (
            <>
                <Header handler1={this.showLog} handler2={this.showReg} show={this.state.showUserForm} user={this.props.app.currentUser} />
                <div className='outer'>
                    <Switch>
                        <Route path='/products/' render={(props)=><ProductsContainer {...props} showShadow={this.showShadow} showMoreInfo={this.showMoreInfo} addToCart={this.addToCart}/>} />
                        <Route exact path={`/user/${this.props.app.currentUser.id}/orders`} component={OrdersContainer} />
                        <Route exact path='/' component={About} />
                        <Route exact path='/contacts' component={Contacts} />
                        <Route exact path='/reviews' component={Reviews} />
                        {this.props.app.currentUser.root ? <Route exact path='/info/user/:id' component={UserPageContainer} /> : null}
                    </Switch>
                </div>
                <Footer />
                {this.state.showShadow && <ShadowBox handler={this.clearShadow}/>}
                {this.state.showLog && <AuthContainer checkUser={this.checkUser}/>}
                {this.state.showReg && <RegistrationContainer regNewUser={this.regNewUser} />}
                {this.state.showCart && <CartContainer buy={this.pushOrder} more={this.moreProduct} less={this.lessProduct} deleteP={this.deleteProduct}/>}
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
    setDataUsers,
    setDataOrders,
    setDataServices,
    setCurrentUser,
    setCartArray,
    setCartSum,
    setCartGroup
};

export default connect (mapStateToProps,mapDispatchToProps)(App)
