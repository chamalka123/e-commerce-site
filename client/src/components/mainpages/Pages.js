import React, {useContext, useState} from 'react'
import {Switch, Route}from 'react-router-dom'
import Services from './services/Services'
import DetailService from './detailService/DetailService'
import Login from './auth/Login'
import Register from './auth/Register'
import History from './history/History'
import NotFound from './utils/not_found/NotFound'
import Categories from './categories/Categories'
import CreateService from './createService/CreateService'
import { GlobalState } from '../../GlobalState'


function MainPages(){
    const state=useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    return(
        <Switch>
            <Route path="/" exact component={Services}/>
            <Route path="/detail/:id" exact component={DetailService}/>
            <Route path="/login" exact component={isLogged ? NotFound : Login}/>
            <Route path="/register" exact component={isLogged ? NotFound : Register}/>
            <Route path="/category" exact component={isAdmin ? Categories : NotFound}/>
            <Route path="/create_service" exact component={isAdmin ? CreateService : NotFound}/>
            <Route path="/edit_service/:id" exact component={isAdmin ? CreateService : NotFound}/>
            <Route path="/history" exact component={History}/>
            <Route path="*" exact component={NotFound}/>
        </Switch>
    )
}
export default MainPages