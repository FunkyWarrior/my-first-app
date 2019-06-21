import React from 'react';
import {connect} from "react-redux";

import Products from './Products'



class ProductsContainer extends React.Component {
    render() {
        return (
                <main className='main'>
                    {this.props.dataServices.map(el => (
                        <Products
                            key={el.id}
                            id={el.id}
                            product={el}
                            showMoreInfo={this.props.showMoreInfo}
                            showShadow={this.props.showShadow}
                            addToCart={this.props.addToCart}
                        />
                    ))}
                </main>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
};


export default connect(mapStateToProps)(ProductsContainer);