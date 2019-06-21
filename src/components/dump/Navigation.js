import React from 'react'
import  {Route} from "react-router-dom";

import About from "../Pages/About"
import Contacts from "../Pages/Contacts"
import Reviews from "../Pages/Reviews"
import MainContent from "../MainContent";
import UserOrder from "./UserOrder";

export default (props) => {
    let kotiki;
    let pesiki;
    let user;
    let ordersArray=[];
    if (props.data[0]){
        kotiki = props.data[0].kotiki;
        pesiki = props.data[0].pesiki
    }
    if (props.user){
        console.log(props.user);
        if (props.user.root) {
            user=props.user.id;
            ordersArray = props.orders.slice();
            console.log('nav',ordersArray)
        }else {
            user=props.user.id;
            props.orders.map(el => {
                if(el.userId === user){
                    ordersArray.push(el)
                }
            });

        }
        ordersArray.sort(function(a, b) {
            if (a.status > b.status) return -1;
            if (a.status < b.status) return 1;
            if (a.date > b.date) return -1;
            if (a.date < b.date) return 1;
            return 0
        })
    }


    return (
        <div className='outer'>
            <Route exact path='/products/kotiki' render={()=><MainContent data={kotiki} handler={props.handler} showState={props.showState} addToCart={props.addToCart}/>} />
            <Route exact path='/products/pesiki' render={()=><MainContent data={pesiki} handler={props.handler} showState={props.showState} addToCart={props.addToCart}/>} />
            <Route exact path='/' render={()=><About />} />
            <Route exact path='/contacts' render={()=><Contacts />} />
            <Route exact path='/reviews' render={()=><Reviews />}/>
            <Route exact path={`/user/${user}/orders`} render={()=><UserOrder order={ordersArray} services={props.data} user={props.user} users={props.users}/> } />

        </div>
    )
}