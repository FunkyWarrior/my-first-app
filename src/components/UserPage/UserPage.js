import React from 'react';
import OrdersContainer from '../Orders/OrdersContainer'

export default (props) => {
    return (
        <div >
            <p>{props.dataUsers.find(u => +props.userId === u.id).name}</p>
            <p>{props.dataUsers.find(u => +props.userId === u.id).lastName}</p>
            <p>{props.dataUsers.find(u => +props.userId === u.id).regDate}</p>
            <p>{props.dataUsers.find(u => +props.userId === u.id).email}</p>
            <p>{props.dataUsers.find(u => +props.userId === u.id).phone}</p>
            <p>{props.dataUsers.find(u => +props.userId === u.id).avatarUrl}</p>
            <OrdersContainer flag={true} userId={props.userId}/>
        </div>

    );
};
