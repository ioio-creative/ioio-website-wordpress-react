import React, { Component } from 'react';

class ProjectTemp01 extends Component {
    constructor(props) {
        super(props);        
    }
    
    render() {
        const props = this.props;
        const imageSrcs = props.images.map((image) => {
            return image.guid;
        });
                
        return (
            <div>
                <div><strong>Project Temp 01</strong></div>
                <div>
                    <img src={imageSrcs[0]} alt="image 1" />
                </div>
                <div>
                    <img src={imageSrcs[1]} alt="image 2" />
                </div>
                <div>
                    <img src={imageSrcs[2]} alt="image 3" />
                </div>
            </div>
        );
    }
}

export default ProjectTemp01;