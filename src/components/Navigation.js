import React from 'react'
import  {Route} from "react-router-dom";

import MainContent from "./MainContent";
import LogInForm from "./LogInForm";
import RegisterForm from './RegisterForm'

export default class Navigation extends React.Component {
    render() {
        return (
            <>
                <Route exact path='/' render={()=><MainContent data={this.props.data} handler={this.props.handler} showState={this.props.showState} addToCart={this.props.addToCart}/>} />
                <Route exact path='/about' render={()=><LogInForm />} />
                <Route exact path='/contacts' render={()=><RegisterForm />} />
            </>
        )
    }
}