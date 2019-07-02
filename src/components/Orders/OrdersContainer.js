import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import Orders from './Orders'
import {getData} from "../../store/app/actions";


class OrdersContainer extends React.Component {

    componentDidMount() {
        this.props.getData('orders','dataOrders');
    }

    sort = function(a, b) {
        if (a.status > b.status) return -1;
        if (a.status < b.status) return 1;
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0
    };

    open =(e) => {
        let target;
        // eslint-disable-next-line no-unused-expressions
        (e.target.className === 'orders__item') ? target = e.target : null;
        // eslint-disable-next-line no-unused-expressions
        (e.target.className === 'orders__info') ? target = e.target.parentElement : null;
        // eslint-disable-next-line no-unused-expressions
        (e.target.className !== 'orders__info' && e.target.className !== 'orders__item') ? target = e.target.parentElement.parentElement : null;
        target.style.maxHeight = (target.style.maxHeight === '100%') ? '40px' : '100%';
    };

    render() {
        const {dataOrders,currentUser,dataServices,dataUsers,flag,userId} = this.props;
        let adminOrdersArray = dataOrders.slice();
        let userOrderArray = [];
        dataOrders.map(el =>
            el.userId === currentUser.id ?
                userOrderArray.push(el) :
                null
        );
        if (flag) {
            userOrderArray = [];
            dataOrders.map(el =>
                el.userId === +userId ?
                    userOrderArray.push(el) :
                    null
            )
        }
        adminOrdersArray.sort(this.sort);
        userOrderArray.sort(this.sort);

            return (
                <div className='orders' style={!flag ? {margin: '0 15%'} :{margin: '0%'} }>
                    {currentUser.root && <button>Submit changes</button>}
                    {(currentUser.root && !flag ? adminOrdersArray : userOrderArray).map(order =>
                        (<div style={order.status==='done'?{backgroundColor:"lightcoral"}:null} className='orders__item' key={order.id} onClick={this.open}>
                            <div className='orders__info'>
                                <p>{`ID: ${order.id}`}</p>
                                <p className='orders__date'>{order.date}</p>
                                {currentUser.root ? <Link to={`/info/user/${order.userId}`}>{dataUsers.find(u => u.id === order.userId) ? dataUsers.find(u => u.id === order.userId).email : null }</Link> : <p>Email: {currentUser.email}</p>}
                                {!currentUser.root ? <p>Status:{order.status}</p>
                                    :   <select className='orders__select'>
                                        <option >{order.status}</option>
                                        <option >{order.status === 'done' ? 'pending' : 'done'}</option>
                                    </select>}
                                <p>{`Sum: ${order.totalSum}`}</p>
                            </div>
                            <Orders order={order} dataServices={dataServices}/>
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
        dataUsers:state.auth.dataUsers
    }
};

const mapDispatchToProps = {
    getData

};


export default connect(mapStateToProps,mapDispatchToProps)(OrdersContainer);