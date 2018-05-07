import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from 'pages/sketch';

class P5SketchTrialPage extends Component {
    render() {
        return (
            <P5Wrapper sketch={sketch} />
        );
    }
}

export default P5SketchTrialPage;
