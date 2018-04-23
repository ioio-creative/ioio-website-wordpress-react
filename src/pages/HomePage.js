import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import routes from 'globals/routes';

class HomePage extends Component {
    render() {
        return (
            <Redirect to={routes.about}/>
        );
    }
}

export default HomePage;
