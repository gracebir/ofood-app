import React from 'react'

import { Route, Switch } from 'react-router-dom';
import SignInScreen from '../components/user/login';
import Home from './home/home.page';
import Navbar from './navBar/Navbar.component';


const Routes = () => {
    return (
        <Switch>
            <Route exact={true} path="/login" component={SignInScreen}/>
            <Navbar>
                <Route exact={true} path="/" component={Home}/>
            </Navbar>
        </Switch>
    )
}

export default Routes