import React from 'react';

const LabTemp04 = ({ background_mood_color, images }) => {
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
          {images.map(image => (
            <img
              key={image.id}
              src={image.guid}
              className='img-fluid'
              alt='alt'
            />
          ))}
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default LabTemp04;
