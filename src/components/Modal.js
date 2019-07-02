import React from 'react'
import {setDataAuth,changeUserInputValue,changeUserInfo,addNewUser} from "../store/auth/actions";
import {setDataApp, createNewCart} from "../store/app/actions";
import {connect} from "react-redux";
import Input from "./Input";



class Modal extends React.Component {

    addToCart = (event) => this.props.createNewCart({event:event,currentUser:this.props.currentUser});

    close = () => {
        this.props.setDataApp({data:null,path:'currentModal'});
        this.props.setDataAuth({data:false,path:'showShadow'})
    };

    changeCurrentUserData = (e) => {
        e.preventDefault();
        this.props.changeUserInfo(this.props.addNewUser)

    };

    render() {
        const {currentModal,currentUser,showUserForm,changeForm,changeUserInputValue} = this.props;
        return (
            <>
                {currentModal && <div  className='main__content-open'>
                    <div  className='main__inner'>
                        <img title={currentModal.bodyShort} className='main__img' src={currentModal.servicePhoto} alt=""/>
                        <h4 className='main__long'>{currentModal.bodyLong}</h4>
                        <p className='main__price'>Price: {currentModal.price}</p>
                        <div className='main__buttons'>
                            <button onClick={this.close} className='main__info' >Close Info</button>
                            <button onClick={this.addToCart} id={currentModal.id} name={currentModal.group} className='main__add-cart'>Add to cart</button>
                        </div>
                    </div>
                </div>}
                {showUserForm && <div className='reg'>
                    <h2 className='reg__title'>Change Info Form</h2>
                    <form onSubmit={this.changeCurrentUserData} className='reg__form'>
                        {changeForm.map(el =>
                            // eslint-disable-next-line no-unused-expressions
                            {(el.value === '') ? el.value = currentUser[el.name] : null;
                                return (
                                    <Input key={el.id} el={el} changeInputValue={changeUserInputValue}/>
                                )
                            }
                        )}
                        <input type="submit" value='Submit change' className='reg__submit'/>
                    </form>
                </div>}
            </>
        )
    }
}

const mapStateProps = state => {
    return {
        currentModal:state.app.currentModal,
        currentUser:state.auth.currentUser,
        showUserForm:state.auth.showChangeUser,
        changeForm:state.auth.changeForm,

    }
};

const mapDispatchProps = {
    setDataApp,
    setDataAuth,
    createNewCart,
    changeUserInputValue,
    changeUserInfo,
    addNewUser
};

export default connect(mapStateProps,mapDispatchProps)(Modal);
