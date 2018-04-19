import React, { Component } from 'react';

class NotFoundPage extends Component {
    render() {
        console.log("not found");
        return (
            <div>
                <h3>404 page not found</h3>
                <p>We are sorry but the page you are looking for does not exist.</p>
            </div>
        );
    }
}

export default NotFoundPage;
