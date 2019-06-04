import React from 'react';

export default class Service extends React.Component {
    state = {
        active:false
    };


    handler = () => {
        this.props.handler();
        this.setState({ active: !this.state.active });
        this.props.showState();
    };

    render() {
        return (
            <div id={this.props.id} className={!this.state.active ? 'main__content' : 'main__content-open'}>
                <div  className='main__inner'>
                    <img title={this.props.element.bodyShort} className='main__img' src={this.props.element.servicePhoto} alt=""/>
                    <h3 className='main__short'>{this.props.element.bodyShort}</h3>
                    {this.state.active && <h4 className='main__long'>{this.props.element.bodyLong}</h4>}
                    <p className='main__price'>Price: {this.props.element.price}</p>
                    <div className='main__buttons'>
                        <button onClick={this.handler} className='main__info'>{!this.state.active ? 'More Info' : 'Close Info'}</button>
                        <button onClick={this.props.addToCart}className='main__add-cart'>Add to cart</button>
                    </div>
                </div>
            </div>
        )
    }
}