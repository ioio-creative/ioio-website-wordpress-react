import React, {Component} from 'react';
//import logo from '../images/logo.svg';
import './App.css';

import Main from 'containers/Main';
import Sidebar from 'containers/Sidebar';

import scriptjs from 'scriptjs'

function loadJSFiles() {

  const publicUrl = process.env.PUBLIC_URL;
  var loadScriptsAsync = ['lib/jquery/jquery.min.js','lib/wow/wow.min.js'].map((relativeUrl) => {
    return publicUrl + "/" + relativeUrl;
  });
  var loadScriptsLater = ['lib/jquery/jquery-migrate.min.js','lib/bootstrap/js/bootstrap.bundle.min.js','lib/owlcarousel/owl.carousel.min.js','lib/easing/easing.min.js','lib/superfish/hoverIntent.js','lib/scrollspy/scrollspy.js','lib/isotope/isotope.pkgd.min.js','lib/touchSwipe/jquery.touchSwipe.min.js'].map((relativeUrl) => {
    return publicUrl + "/" + relativeUrl;
  });

    scriptjs(loadScriptsAsync, () => {
      scriptjs(loadScriptsLater,'bundle')
    });
    scriptjs.ready('bundle', function() {
      scriptjs(publicUrl+'/js/loadByPage.js')
      scriptjs(publicUrl+'/lib/jqueryvide/jquery.vide.js')

    })

    console.log("Global JS Files Loaded");
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      loadJSFiles()
  }

  render() {

    return (<div>
      <Sidebar/>
      <Main/>
    </div>);
  }
}

export default App;
