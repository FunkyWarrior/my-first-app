import React from 'react';
import {connect} from "react-redux";

import Products from './Products'
import {createNewCart} from "../../store/app/actions";



class ProductsContainer extends React.Component {

    render() {
        const path = this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length-1];
        return (
                <main className='main'>
                    {this.props.dataServices[`${path}`]
                    && this.props.dataServices[`${path}`].map(el => (
                        <Products
                            key={el.id}
                            id={el.id}
                            product={el}
                            showMoreInfo={this.props.showMoreInfo}
                            showShadow={this.props.showShadow}
                            // addToCart={this.props.createNewCart}
                        />
                    ))}
                    {!this.props.dataServices[`${path}`]
                    && <div>
                        <p>Sorry no such product path as: {path}</p>
                        <p>Available: {Object.keys(this.props.dataServices).toString()}</p>
                    </div>
                    }
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