import React from 'react';

import Service from './Service'



export default (props) => {
    const services = Object.values({...props.data});
    return (
        <main className='main'>
            {services.map(el => (
                <Service  key={el.id} id={el.id} element={el} handler={props.handler} showState={props.showState} addToCart={props.addToCart}/>
            ))}
        </main>
    )
}



