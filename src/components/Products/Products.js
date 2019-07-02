import React from 'react';
import {createNewCart,
    setDataApp
} from "../../store/app/actions";
import {setDataAuth} from "../../store/auth/actions";
import {connect} from "react-redux";

export class Products extends React.Component {
    state = {
        active:false
    };

    addToCart = (event) => {
        this.props.createNewCart({event:event,currentUser:this.props.currentUser})
    };

    open = () => {
        this.props.setDataApp({data:this.props.product,path:'currentModal'});
        this.props.setDataAuth({data:true,path:'showShadow'})
    };


    render() {
        const props = this.props;
        return (
            <div  className='main__content'>
                <div  className='main__inner'>
                    <img title={props.product.bodyShort} className='main__img' src={props.product.servicePhoto} alt=""/>
                    <h3 className='main__short'>{props.product.bodyShort}</h3>
                    <p className='main__price'>Price: {props.product.price}</p>
                    <div className='main__buttons'>
                        <button onClick={this.open} className='main__info' >More Info</button>
                        <button onClick={this.addToCart} id={props.id} name={props.product.group} className='main__add-cart'>Add to cart</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser:state.auth.currentUser,
        currentModal:state.app.currentModal
    }
};

const mapDispatchProps = {
    createNewCart,
    setDataApp,
    setDataAuth
};

export default connect(mapStateToProps,mapDispatchProps)(Products);