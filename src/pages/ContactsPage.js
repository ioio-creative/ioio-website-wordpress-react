import React, {Component} from 'react';

import './ContactsPage.css';
import ContactForm from 'containers/ContactForm'

import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';

import Footer from 'containers/footer/Footer';
import {fetchActiveContact} from 'websiteApi';


function Items(props) {
  //let id = 0;
  const social_media_items = props.dnas.map((dna, id) => {
    let h
    h = "col-lg-4 box-bg-0" + (
    id + 1)
    return (
      <div className={h} key={id}>
        <h4 className="core-value-title text-left">{dna.my_name}</h4>
        <div className="text-center">
          <img src={dna.image.guid} alt="alt" className="img-fluid core-value-img"/>
        </div>
        <p className="description text-center" dangerouslySetInnerHTML={{
          __html: dna.desc
        }} />
      </div>
    );
  });

  return (
    <div className="row wow fadeInUp">
      {social_media_items}
    </div>
  );
}

function SocialMedia(props) {
  const social_media_items = props.items.map((item, index) => {
    return (
      <a href={item.link} key={index} className="youtube"><img src={item.icon.guid} alt={item.my_name} /></a>
    );
  });

  return (
    <div>
      {social_media_items}
    </div>
  );
}

class ContactsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contact: null
    }
  }

  componentDidMount() {
    fetchActiveContact((cContact) => {
      this.setState({contact: cContact});
    });
  }

  render() {

    const contact = this.state.contact;
    if (contact === null) {
      return <MyFirstLoadingComponent isLoading={true} />;
      // return null;
    }
    if (contact.facebook_og_images && contact.facebook_og_images.length) {
      const ogimage = document.querySelectorAll('[property="og:image"]');
      contact.facebook_og_images.forEach(ogimgobj => {
        const newmeta = document.createElement('meta');
        newmeta.setAttribute('property', 'og:image');
        newmeta.setAttribute('content', ogimgobj.guid);
        ogimage[0].parentNode.insertBefore(newmeta,ogimage[0]);
      });
      ogimage.forEach(oldmeta => {
        oldmeta.parentNode.removeChild(oldmeta);
      })
    }
    return (
      <div>
        <section id="contact-top" className="wow contact-section-bg">
          <div className="container-fluid row text-left">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <h3 className="contactpage-title">{contact.page_title}</h3>
              <h1>{contact.page_subtitle}</h1>
            </div>
            <div className="col-md-1"></div>
          </div>
        </section>

        <section id="contact-core-value">
          <div className="container-fluid">
            <Items dnas={contact.dnas}/>
          </div>
        </section>

        <section id="contact-social-media">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-10"><h3 className="contactpage-title">{contact.social_media_title}</h3>
              <SocialMedia items={contact.social_media}
              />
            </div>
              <div className="col-md-1"></div>
            </div>
          </div>
        </section>

        <section id="contact-form">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-10"><h3 className="contactpage-title">{contact.contact_form_title}</h3><h2>{contact.contact_form_desc}</h2><ContactForm/></div>
              <div className="col-md-1"></div>
              {/* <ContactForm data={dict} ></ContactForm> */}
            </div>
          </div>
        </section>
        <Footer />        
      </div>
    );
  }
}

export default ContactsPage;
