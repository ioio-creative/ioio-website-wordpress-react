import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fonts/font.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom'

ReactDOM.render((
    <BrowserRouter>
      {/*console.log(this.props.location.pathname)*/}
      <App />
    </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();

//TODO
//load new page on social links
