import React, {Component} from 'react';

class ProjectTemp01 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    const imageSrcs = props.images.map((image,index) => {
      return image.guid;
    });

    return (<section className="photo-montage">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 photo-montage-l">
            <img src={imageSrcs[0]} className="img-fluid" alt=""/>
          </div>
          <div className="col-lg-6 photo-montage-r">
            <img src={imageSrcs[1]} className="img-fluid" alt=""/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 photo-montage-l">
            <img src={imageSrcs[2]} className="img-fluid" alt=""/>
          </div>
        </div>
      </div>

    </section>);
  }
}

export default ProjectTemp01;
