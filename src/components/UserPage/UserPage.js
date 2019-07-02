import React from 'react';
import OrdersContainer from '../Orders/OrdersContainer'

export default (props) => {
    const user = props.dataUsers.find(u => +props.userId === u.id);
    return (
        <div >
            {user && <>
            <p>{user.name}</p>
            <p>{user.lastName}</p>
            <p>{user.regDate}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.avatarUrl}</p>
            <OrdersContainer flag={true} userId={props.userId}/>
               </> }
        </div>

    );
};
