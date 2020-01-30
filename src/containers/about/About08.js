import React from 'react';


function About08(props) {    
  const { about } = props;  
  return (<section id="about-press" className="about-section-bg">
      <div className="container">
        <header className="section-header">
          <h3>{about.press_section_title}</h3>
          <p>{about.press_section_desc}</p>
        </header>
        <div className="row about-cols">
          <div className="col-md-12 wow fadeInDown">
            <div className="about-col">
              <div className="img">
                <img src="img.jpg" alt="" className="img-fluid" />
              </div>
              <p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );  
}


export default About08;