import React from 'react';
import CartItem from './CartItem'

export default (props) => {
    const item = props.cartArray
    return (
        <div className='cart'>
            <h3 className='cart__sum'>Sum:{props.sum}</h3>
            <div className='cart__inner'>
                {item.map(el => (
                    <CartItem key={el.id} id={el.id} el={el} group={el.group} data={props.data} more={props.more} less={props.less} deleteP={props.deleteP}/>
                ))}
            </div>
            <button onClick={props.buy} className='cart__buy'>Confirm Purchase</button>
        </div>
    );
};

