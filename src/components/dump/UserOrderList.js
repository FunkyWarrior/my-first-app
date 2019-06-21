import React from 'react';

export default class extends React.Component {
    render() {
        return (
            <div className='orders__list'>
                {this.props.order.order.map(el => (
                    <div className='orders__inner' key={el.id}>
                        <img className='orders__img' src={this.props.data[`${el.group}`].find(ser => ser.id === el.productId).servicePhoto} alt=""/>
                        <p>{this.props.data[`${el.group}`].find(ser => ser.id === el.productId).bodyShort}</p>
                        <p>{this.props.data[`${el.group}`].find(ser => ser.id === el.productId).price}</p>
                        <p>{el.count}</p>
                        <p>{Number(this.props.data[`${el.group}`].find(ser => ser.id === el.productId).price) * el.count}</p>
                    </div>))}
            </div>
        );
    }

};

