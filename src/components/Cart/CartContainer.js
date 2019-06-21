import React from 'react';
import {connect} from "react-redux";

import Cart from './Cart'


class CartContainer extends React.Component {
    render() {
        return (
            <div className='cart'>
                <h3 className='cart__sum'>Sum:{this.props.cartSum}</h3>
                <div className='cart__inner'>
                    {this.props.cartArray.map(el => (
                        <Cart
                            key={el.id}
                            id={el.id}
                            product={el}
                            group={el.group}
                            dataServices={this.props.dataServices}
                            more={this.props.more}
                            less={this.props.less}
                            deleteP={this.props.deleteP}/>
                    ))}
                </div>
                <button onClick={this.props.buy} className='cart__buy'>Confirm Purchase</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cartArray: state.app.cartArray,
        cartGroup: state.app.cartGroup,
        cartSum: state.app.cartSum,
        dataServices: state.app.dataServices,
    }
};


export default connect(mapStateToProps)(CartContainer);