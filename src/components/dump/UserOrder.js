import React from 'react';

import UserOrderList from './UserOrderList'
export default class extends React.Component {
    render() {
        const props = this.props;
        let data;
        if (props.services){
            data = props.services[0];
        }
        console.log('userOrder',props.order)
        return (
            <div className='orders'>
                {props.user.root && <button>Submit changes</button>}
                {props.order.map(order =>
                    (<div style={order.status==='done'?{backgroundColor:"lightcoral"}:null} className='orders__item' key={order.id}>
                        <div className='orders__info'>
                            <p>{`ID: ${order.id}`}</p>
                            <p className='orders__date'>{order.date}</p>
                            <p>{props.user.root ? props.users.find(u => u.id === order.userId).email : `Email: ${props.user.email}`}</p>
                            {!props.user.root ? <p>{`Status: ${order.status}`}</p>
                                :   <select className='orders__select'>
                                        <option >{order.status}</option>
                                        <option >{order.status === 'done' ? 'pending' : 'done'}</option>
                                </select>}
                            <p>{`Sum: ${order.totalSum}`}</p>
                        </div>
                        <UserOrderList order={order} data={data}/>
                    </div>)

                )}
            </div>
        )
    }
};

