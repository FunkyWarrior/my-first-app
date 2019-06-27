import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import Orders from './Orders'
import {getData} from "../../store/app/actions";


class OrdersContainer extends React.Component {
    componentDidMount() {
        this.props.getData('orders','dataOrders');
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
        if (this.props.flag) {

            ordersArray=[];
            // eslint-disable-next-line array-callback-return
            this.props.dataOrders.map(el => {
                if(el.userId === +this.props.userId) {
                    ordersArray.push(el)
                }
            });
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
                                {this.props.currentUser.root ? <Link to={`/info/user/${order.userId}`}>{this.props.dataUsers.find(u => u.id === order.userId).email }</Link> : <p>Email: {this.props.currentUser.email}</p>}
                                {!this.props.currentUser.root ? <p>Status:{order.status}</p>
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
        currentUser:state.auth.currentUser,
        dataServices:state.app.dataServices,
        dataOrders:state.app.dataOrders,
        dataUsers:state.auth.dataUsers,


    }
};

const mapDispatchToProps = {
    getData

};


export default connect(mapStateToProps,mapDispatchToProps)(OrdersContainer);