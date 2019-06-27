import React from 'react';
import {connect} from "react-redux";

import Products from './Products'
import {createNewCart} from "../../store/app/actions";



class ProductsContainer extends React.Component {
    render() {
        return (
                <main className='main'>
                    {this.props.dataServices[`${this.props.location.pathname.slice(this.props.location.pathname.length-6,this.props.location.pathname.length)}`].map(el => (
                        <Products
                            key={el.id}
                            id={el.id}
                            product={el}
                            showMoreInfo={this.props.showMoreInfo}
                            showShadow={this.props.showShadow}
                            // addToCart={this.props.createNewCart}
                        />
                    ))}
                </main>
        )
    }
}

const mapStateToProps = state => {
    return {
        dataServices:state.app.dataServices
    }
};

const mapDispatchProps = {
    createNewCart
};

export default connect(mapStateToProps,mapDispatchProps)(ProductsContainer);