import React from 'react';

export default (props) => {
    const item = props.dataServices[`${props.group}`].find(el => el.id === props.product.productId && el.group === props.product.group);
    return (
        <div  className='cart__item'>
            <img className='cart__img' src={item.servicePhoto} alt=""/>
            <p className='cart__name'>{item.bodyShort}</p>
            <p className='cart__price'>{item.price}</p>
            <p className='cart__count'>{props.product.count}</p>
            <div className='cart__buttons'>
                <button onClick={props.change} id={props.product.productId} name={props.group} className='cart__remove'>X</button>
                <button onClick={props.change} id={props.product.productId} name={props.group} className='cart__more'>+</button>
                <button onClick={props.change} id={props.product.productId} name={props.group} className='cart__less'>-</button>
            </div>
        </div>

    );
};

