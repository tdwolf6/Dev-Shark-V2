import React, { useState } from 'react';
import UserFavs from './UserFavs';
import {
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    ListItem,
    ListItemText,
  } from '@material-ui/core';

  export default function UserFavorites (props){
    // const resources = props.favResources
    const test = () =>{
        console.log('hello')
    }
//     props.favResources.map((ele,i) => {
//        return (<UserInfo key={`resource${i}`} resource={ele} id={`resource${i}`} />)
//   }
    return (
        <div>
            <UserFavs getFunc={props.getResources}  resources={props.favResources}/> 
        </div>
        
    )
  
      
};


