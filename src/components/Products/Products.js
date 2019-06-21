import React from 'react';

export default class Service extends React.Component {
    state = {
        active:false
    };


    handler = () => {
        this.props.showShadow();
        this.setState({ active: !this.state.active });
        this.props.showMoreInfo();
    };

    render() {
        const props = this.props;
        return (
            <div id={props.id} className={!this.state.active ? 'main__content' : 'main__content-open'}>
                <div  className='main__inner'>
                    <img title={props.product.bodyShort} className='main__img' src={props.product.servicePhoto} alt=""/>
                    <h3 className='main__short'>{props.product.bodyShort}</h3>
                    {this.state.active && <h4 className='main__long'>{props.product.bodyLong}</h4>}
                    <p className='main__price'>Price: {props.product.price}</p>
                    <div className='main__buttons'>
                        <button onClick={this.handler} className='main__info' >{!this.state.active ? 'More Info' : 'Close Info'}</button>
                        <button onClick={props.addToCart} name={props.product.group} className='main__add-cart'>Add to cart</button>
                    </div>
                </div>
            </div>
        )
    }
}