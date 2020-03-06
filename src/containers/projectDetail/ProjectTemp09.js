import React, {Component} from 'react';

class ProjectTemp09 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    const bg = {
      backgroundColor: props.background_mood_color,
    };

    let descriptionStyle = {
      textAlign: "left",
      fontWeight: "normal"
    };

    const isTextAlignDescriptionCenter = props.is_text_align_description_center === "1";
    if (isTextAlignDescriptionCenter) {
      descriptionStyle.textAlign = "center";
    }

    const isBoldDescription = props.is_bold_description === "1";
    if (isBoldDescription) {
      descriptionStyle.fontWeight = "bold";
    }
    
    return (
      <section className="photo-montage-one-text project-section-bg wow fadeIn">
        <div className="container-fluid" style={bg}>
          <div className="row">
            {
              props.section_title &&
              <React.Fragment>
                <div className="col-md-4"></div>
                <div className="col-md-4"><p>{props.section_title}</p></div>
                <div className="col-md-4"></div>
              </React.Fragment>
            }
            {
              props.description &&
              <React.Fragment>
                <div className="col-md-4"></div>
                <div className="col-md-4"><p style={descriptionStyle} dangerouslySetInnerHTML={{
                  __html: props.description
                }} /></div>
                <div className="col-md-4"></div>
              </React.Fragment>
            }
          </div>
          <p></p>
        </div>
      </section>
    );
  }
}

export default ProjectTemp09;