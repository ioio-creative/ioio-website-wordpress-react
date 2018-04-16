import React, { Component } from 'react';

import { getMultipleTextsFromSingleText } from 'utils/textAreaDelimiter';

class ProjectTemp02 extends Component {
    constructor(props) {
        super(props);        
    }

    render() {
        const props = this.props;
        const texts = getMultipleTextsFromSingleText(props.text_areas);
        const textContainer = texts.map((text) => {
            return (
                <div>
                    <br />
                    <div>
                        {text}
                    </div>
                </div>
            );
        });
        return (
            <div>
                <div><strong>Project Temp 02</strong></div>                
                {textContainer}
            </div>
        );
    }
}

export default ProjectTemp02;