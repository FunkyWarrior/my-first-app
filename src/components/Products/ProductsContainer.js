import React from 'react';
import {connect} from "react-redux";

import Products from './Products'



class ProductsContainer extends React.Component {
    render() {
        // let data = [];
        // if (this.props.dataServices[`${this.props.location.pathname.slice(this.props.location.pathname.length-6,this.props.location.pathname.length)}`]) {
        //     data = this.props.dataServices[`${this.props.location.pathname.slice(this.props.location.pathname.length-6,this.props.location.pathname.length)}`]
        // }
        return (
                <main className='main'>
                    {this.props.dataServices[`${this.props.location.pathname.slice(this.props.location.pathname.length-6,this.props.location.pathname.length)}`].map(el => (
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
        dataServices:state.app.dataServices
    }
};

export default connect(mapStateToProps)(ProductsContainer);