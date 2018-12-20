import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Router, Route, Link} from 'react-router-dom';


import Battlemind from './containers/Battlemind';


if (document.getElementById('root')) {
    ReactDOM.render(

    <BrowserRouter>
        <div >
            <Battlemind />

        </div>
    </BrowserRouter>
    
    
    
    , document.getElementById('root'));
}