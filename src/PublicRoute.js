import React from 'react';
import { Route } from 'react-router-dom';
import FrontLayout from './layouts/front/FrontLayout';

function PublicRoute({...rest}){

    return(
        <Route {...rest} render={(props)=> <FrontLayout {...props}/>}/>
    )

}
export default PublicRoute;