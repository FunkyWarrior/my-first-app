import React from 'react';
import {connect} from "react-redux";

import Cart from './Cart'
import {
    changeCartProduct,
    putDataApp
} from "../../store/app/actions";


class CartContainer extends React.Component {

    changeCartProduct = (event) => {
        this.props.changeCartProduct(event)
    };

    pushOrder = () => {
        this.props.putDataApp({
            payload:[
                ...this.props.dataOrders,
                {
                    id:this.props.dataOrders[this.props.dataOrders.length-1].id + 1,
                    date:new Date().toLocaleString(),
                    order:this.props.cartArray,
                    status:'pending',
                    totalSum:this.props.sum,
                    userId:this.props.currentUser.id
                }],
            where:'orders'
            }
        )
    };

    render() {
        console.log(this.props.cartArray)
        return (
            <div className='cart'>
                <h3 className='cart__sum'>Sum:{this.props.cartSum}</h3>
                <div className='cart__inner'>
                    {this.props.cartArray.map(el => (
                        <Cart
                            key={el.id}
                            id={el.id}
                            product={el}
                            group={el.group}
                            dataServices={this.props.dataServices}
                            more={this.props.more}
                            less={this.props.less}
                            deleteP={this.props.deleteP}
                            change={this.changeCartProduct}/>
                    ))}
                </div>
                <button onClick={this.pushOrder} className='cart__buy'>Confirm Purchase</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cartArray: state.app.cartArray,
        cartSum: state.app.cartSum,
        dataServices: state.app.dataServices,
        showCart:state.app.showCart,
        dataOrders: state.app.dataOrders,
        sum:state.app.cartSum,
        currentUser:state.auth.currentUser
    }
};

const mapDispatchProps = {
    changeCartProduct,
    putDataApp
};


export default connect(mapStateToProps,mapDispatchProps)(CartContainer);