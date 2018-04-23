import React, {Component} from 'react';
//import logo from '../images/logo.svg';
import './App.css';
import 'css/style.css';
import 'css/sidebar.css';

import Main from 'containers/Main';
import Sidebar from 'containers/Sidebar';

import scriptjs from 'scriptjs'

function loadJSFiles() {

var loadScriptsAsync = ['lib/jquery/jquery.min.js','lib/bootstrap/js/bootstrap.bundle.min.js','lib/wow/wow.min.js']
var loadScriptsDefer = ['lib/jquery/jquery-migrate.min.js','lib/owlcarousel/owl.carousel.min.js','lib/easing/easing.min.js','lib/superfish/hoverIntent.js','/lib/scrollspy/scrollspy.js','lib/isotope/isotope.pkgd.min.js','lib/touchSwipe/jquery.touchSwipe.min.js'];

  scriptjs(loadScriptsAsync, () => {
    for (let i = 0; i < loadScriptsDefer.length; i++) {
      scriptjs(loadScriptsDefer[i],'bundle')
    }

  });
  scriptjs.ready('bundle', function() {
    //scriptjs()
  })

}

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {

    return (<div>
      <Sidebar/>
      <Main/>
      {loadJSFiles()}
    </div>);
  }
}

export default App;
