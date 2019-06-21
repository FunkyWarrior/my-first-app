import React from 'react';
import {connect} from "react-redux";

import Orders from './Orders'
import {setDataOrders} from "../../store/app/actions";


class OrdersContainer extends React.Component {
    componentDidMount() {
        fetch(`https://boris-first-app.firebaseio.com/orders.json`)
        .then(response => response.json())
        .then(result => this.props.setDataOrders(result));
    }

    render() {
        let ordersArray = [];
        if (this.props.currentUser) {
            if (this.props.currentUser.root) {
                ordersArray = this.props.dataOrders.slice();
            } else {
                // eslint-disable-next-line array-callback-return
                this.props.dataOrders.map(el => {
                    if (el.userId === this.props.currentUser.id) {
                        ordersArray.push(el)
                    }
                });
            }
        }
            ordersArray.sort(function(a, b) {
                if (a.status > b.status) return -1;
                if (a.status < b.status) return 1;
                if (a.date > b.date) return -1;
                if (a.date < b.date) return 1;
                return 0
            });

            return (
                <div className='orders'>
                    {this.props.currentUser.root && <button>Submit changes</button>}
                    {ordersArray.map(order =>
                        (<div style={order.status==='done'?{backgroundColor:"lightcoral"}:null} className='orders__item' key={order.id}>
                            <div className='orders__info'>
                                <p>{`ID: ${order.id}`}</p>
                                <p className='orders__date'>{order.date}</p>
                                <p>{this.props.currentUser.root ? this.props.dataUsers.find(u => u.id === order.userId).email : `Email: ${this.props.currentUser.email}`}</p>
                                {!this.props.currentUser.root ? <p>{`Status: ${order.status}`}</p>
                                    :   <select className='orders__select'>
                                        <option >{order.status}</option>
                                        <option >{order.status === 'done' ? 'pending' : 'done'}</option>
                                    </select>}
                                <p>{`Sum: ${order.totalSum}`}</p>
                            </div>
                            <Orders order={order} dataServices={this.props.dataServices}/>
                        </div>)
                    )}
                </div>
            )

    }
}

const mapStateToProps = state => {
    return {
        currentUser:state.app.currentUser,
        dataServices:state.app.dataServices,
        dataOrders:state.app.dataOrders,
        dataUsers:state.app.dataUsers

    }
};

const mapDispatchToProps = {
    setDataOrders

};


export default connect(mapStateToProps,mapDispatchToProps)(OrdersContainer);