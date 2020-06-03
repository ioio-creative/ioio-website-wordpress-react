import React from 'react';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import 'containers/slideshow.css';

const Items = ({ items }) => {
  const member_items = items.map((item, id) => {
    return (
      <div
        className='col-md-3 col-xs-6 col-sm-6 wow fadeInRight'
        key={id}
        data-wow-delay='0.3s'
      >
        <div className='services-col'>
          <div className='img'>
            <img src={item.image.guid} alt='alt' className='img-fluid' />
          </div>
          <div className='item-desc'>
            <p>{item.desc}</p>
          </div>
          <h3>{item.my_name}</h3>
        </div>
      </div>
    );
  });

  const member_items_mobile = items.map((item, id) => {
    return (
      <div
        className='services-cols-mobile col-md-12 col-xs-12 col-sm-12 wow fadeInRight'
        key={id}
        data-wow-delay='0.3s'
      >
        <div className='services-col services-cols-mobile'>
          <div className='img'>
            <img src={item.image.guid} alt='alt' className='img-fluid' />
          </div>
          <div className='item-desc'>
            <p>{item.desc}</p>
          </div>
          <h3>{item.my_name}</h3>
        </div>
      </div>
    );
  });

  return (
    <div className=''>
      <div className='row services-cols'>{member_items}</div>
      <OwlCarousel
        className='services-cols-mobile-slideshow slideshow owl-theme the-team'
        center={true}
        loop={true}
        nav={false}
        autoplay={false}
        dots={true}
        dotsEach={true}
        items={2}
        margin={5}
        slideBy={1}
        autoplayTimeout={2500}
      >
        {member_items_mobile}
      </OwlCarousel>
    </div>
  );
};

const About06 = ({ about: a }) => {
  return (
    <section id='services' className='about-section-bg'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-1'></div>
          <div className='col-md-10'>
            <header className='section-header'>
              <h3>{a.service_section_title}</h3>
              <p>{a.service_section_desc}</p>
            </header>
            <Items items={a.services} />
          </div>
          <div className='col-md-1'></div>
        </div>
      </div>
    </section>
  );
};

export default About06;
