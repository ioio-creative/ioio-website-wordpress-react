import React, {Component} from 'react';
//import logo from '../images/logo.svg';
import './App.css';
import 'css/style.css';
import 'css/sidebar.css';

import Main from 'containers/Main';
import Sidebar from 'containers/Sidebar';



class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // loadjs('lib/jquery/jquery.min.js', function() {
    //   loadjs('lib/jquery/jquery-migrate.min.js', function() {
    //     loadjs('lib/bootstrap/js/bootstrap.bundle.min.js', function() {
    //       loadjs('lib/easing/easing.min.js', function() {
    //         loadjs('lib/superfish/hoverIntent.js', function() {
    //           loadjs('lib/superfish/superfish.min.js', function() {
    //             loadjs('lib/bootstrap/js/bootstrap.bundle.min.js', function() {
    //               loadjs('lib/bootstrap/js/bootstrap.bundle.min.js', function() {
    //                 loadjs('lib/bootstrap/js/bootstrap.bundle.min.js', function() {});
    //               });
    //             });
    //           });
    //         });
    //       });
    //     });
    //   });
    // });

  }

  render() {

    return (<div>
      <Sidebar/>
      <Main/>

    </div>);
  }
}

export default App;
