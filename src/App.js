import React from 'react';

import Navigation from './components/Navigation'
import Header from './components/Header'
import Footer from './components/Footer'
import ShadowBox from './components/ShadowBox'
import LogIn from './components/LogIn'
import Reg from './components/Reg'
import Cart from './components/Cart'




export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moreInfo:false,
            showShadow: false,
            showLog:false,
            showReg:false,
            showUserForm:false,
            showCart:false,
            log_email:'',
            log_password:'',
            reg_name:'',
            reg_Lname:'',
            reg_email:'',
            reg_phone:'',
            reg_avatar:'',
            reg_password1:'',
            reg_password2:'',
            currentUser:null,
            cartArray:[],
            sum:0,
            dataServices: {},
            dataUsers:{},
            dataOrders:{},
        };


    }
    checkUser = (e) => {
        let user = this.state.dataUsers.find(u => u.email === this.state.log_email);
        if(user){
            if(user.password === this.state.log_password){
                this.setState({currentUser:user});
                this.showLog();
                this.showShadow();
                this.setState({showUserForm:!this.state.showUserForm})
            }else alert('Password doesnt match')
        }else alert('Email doesnt match');

        e.preventDefault()
    };

    addToCart = (e) => {
        if (this.state.currentUser){
            const that = e.target.parentElement.parentElement.parentElement.id;
            const product = this.state.dataServices.find(s => s.id == that);
            const arr = this.state.cartArray.slice();
            const check = arr.find(c => c.id == product.id);
            if (check){
                check.count++
            }else{
                arr.push(
                    {
                       id:product.id,
                       count:1
                    }
                );
            }
            this.setState({cartArray:arr});
            this.setState({sum:this.state.sum+product.price});
            this.setState({showCart:true});
        }else {
            alert('Please Log In')
        }
    };
    moreProduct = (e) => {
        const that = e.target.parentElement.parentElement.id;
        const arr = this.state.cartArray.slice();
        const price = this.state.dataServices.find(el => el.id == that);
        const product = arr.find(el => el.id == that);
        product.count++;
        this.setState({sum:this.state.sum+price.price});
        this.setState({cartArray:arr})
    };

    lessProduct =(e) => {
        const that = e.target.parentElement.parentElement.id;
        const price = this.state.dataServices.find(el => el.id == that);
        const arr = this.state.cartArray.slice();
        arr.map(el => {
            if (el.id == that){
                el.count--;
                this.setState({sum:this.state.sum-price.price});
            }
            if (el.count === 0) arr.splice(el,1);
            if (arr.length === 0) this.setState({showCart:false});
        });
        this.setState({cartArray:arr});
    };

    deleteProduct = (e) => {
        const that = e.target.parentElement.parentElement.id;
        const price = this.state.dataServices.find(el => el.id == that);
        const arr = this.state.cartArray.slice();
        const product = arr.find(el => el.id == that);
        this.setState({sum:this.state.sum-(price.price*product.count)});
        arr.splice(product,1);
        if (arr.length === 0) this.setState({showCart:false});
        this.setState({cartArray:arr});
    };

    pushOrder = () => {
        fetch('http://localhost:3001/orders', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: this.state.currentUser.id,
                status:'pending',
                totalSum:this.state.sum,
                order: this.state.cartArray
            })
        });
        this.setState({cartArray:[]});
        this.setState({showCart:false});
    };


     getInputValues = (e) => {
        this.setState({[e.target.name] : e.target.value});
        console.log(this.state.reg_name,          this.state.reg_Lname ,           this.state.reg_email   ,         this.state.reg_phone        ,    this.state.reg_avatar        ,    this.state.reg_password1,            this.state.reg_password2)
    };

    showLog = () => {
        this.setState({ showLog: !this.state.showLog });
        this.showShadow()
    };


    showReg = () => {
        this.setState({ showReg: !this.state.showReg });
        this.showShadow()
    };

    showMoreInfo =() => this.setState({moreInfo: !this.state.moreInfo});

    clearShadow =() => {
        this.setState({showShadow: (!(this.state.showShadow && !this.state.moreInfo))});
        this.setState({showLog:this.state.showLog ? false : null});
        this.setState({showReg:this.state.showReg ? false : null});
    };

    showShadow = () => this.setState({ showShadow: !this.state.showShadow });

    fetchData = (where,what) => {
        fetch(`http://localhost:3001/${what}`)
        .then(response => response.json())
        .then(result => this.setState({[where]: result}));
    };


    componentDidMount() {
        this.fetchData('dataServices','services');
        this.fetchData('dataOrders','orders');
        this.fetchData('dataUsers','users')
    }

    render() {
        return (
            <>
                <Header handler1={this.showLog} handler2={this.showReg} show={this.state.showUserForm} user={this.state.currentUser}/>
                <Navigation data={this.state.dataServices} handler={this.showShadow} showState={this.showMoreInfo} addToCart={this.addToCart}/>
                <Footer />
                {this.state.showShadow && <ShadowBox handler={this.clearShadow}/>}
                {this.state.showLog && <LogIn logIn ={this.checkUser} handler={this.getInputValues}/>}
                {this.state.showReg && <Reg handler={this.getInputValues}/>}
                {this.state.showCart && <Cart data={this.state.dataServices} cartArray={this.state.cartArray} sum={this.state.sum} buy={this.pushOrder} more={this.moreProduct} less={this.lessProduct} deleteP={this.deleteProduct}/>}
            </>
        );
    }
}


