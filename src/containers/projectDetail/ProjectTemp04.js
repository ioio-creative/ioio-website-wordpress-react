import React from 'react';

const ProjectTemp04 = ({ background_mood_color, images }) => {
  const bg = {
    backgroundColor: background_mood_color
  };
  return (
    <section
      className='photo-montage-one-img project-section-bg wow fadeInUp'
      style={bg}
    >
      {/* TODO: modified by Chris */}
      {/* <div className="container"> */}
      <div className='row container-fluid'>
        <div className='col-md-1 '></div>
        <div className='col-md-10'>
          <img src={images[0].guid} className='img-fluid' alt='alt' />
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default ProjectTemp04;
