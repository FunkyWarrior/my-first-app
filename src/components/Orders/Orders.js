import React from 'react';

export default class extends React.Component {
    render() {
        const {order,dataServices} = this.props;
        return (
           <>
               {order.id && <div className='orders__list'>
                    {order.order.map(el => {
                        const service = dataServices[`${el.group}`].find(ser => ser.id === el.productId);
                        return(
                        <div className='orders__inner' key={el.id}>
                            <img
                                className='orders__img'
                                src={service.servicePhoto}
                                alt=""
                            />
                            <p>{service.bodyShort}</p>

                            <p>{service.price}</p>

                            <p>{el.count}</p>

                            <p>{+service.price * el.count}</p>

                        </div>
                    )})}
                </div>}
           </>
        );
    }
};

