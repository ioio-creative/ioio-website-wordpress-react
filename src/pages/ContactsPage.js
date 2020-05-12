import './ContactsPage.scss';

import React, { Component } from 'react';

import { AddressListContextConsumer } from 'globals/contexts/addressListContext';

import ContactForm from 'containers/ContactForm';
import Footer from 'containers/footer/Footer';

import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';

import { fetchActiveContact } from 'websiteApi';

function Item(props) {
  const { containerClassName, name, imgSrc, desc } = props;
  return (
    <div className={containerClassName}>
      <h4 className='core-value-title text-left'>{name}</h4>
      <div className='text-center'>
        <img src={imgSrc} alt='alt' className='img-fluid core-value-img' />
      </div>
      <p className='description text-center'>{desc}</p>
    </div>
  );
}

function Items(props) {
  const { dnas, addresses } = props;
  const social_media_items = dnas.map((dna, id) => {
    const h = 'col-lg-4 box-bg-0' + (id + 1);
    if (id === 0) {
      // if it's first item,
      // use addresses instead of dna.desc
      const addressStr = addresses
        .map(address => {
          return address.display_title + '\n' + address.detail + '\n\n';
        })
        .join('');
      return (
        <Item
          key={id}
          containerClassName={h}
          name={dna.my_name}
          imgSrc={dna.image.guid}
          desc={addressStr}
        />
      );
    } else if (id == 1) {
      // if it's second item,
      // use addresses.phone instead of dna.desc
      const phoneStr = addresses
        .map(address => {
          if (!address.phone) {
            return '';
          }
          return address.display_title + '\n' + address.phone + '\n\n\n';
        })
        .join('');
      return (
        <Item
          key={id}
          containerClassName={h}
          name={dna.my_name}
          imgSrc={dna.image.guid}
          desc={phoneStr}
        />
      );
    } else {
      return (
        <Item
          key={id}
          containerClassName={h}
          name={dna.my_name}
          imgSrc={dna.image.guid}
          desc={dna.desc}
        />
      );
    }
  });

  return <div className='row wow fadeInUp'>{social_media_items}</div>;
}

function SocialMedia(props) {
  const social_media_items = props.items.map((item, index) => {
    return (
      <a href={item.link} key={index} className='youtube'>
        <img src={item.icon.guid} alt={item.my_name} />
      </a>
    );
  });

  return <div>{social_media_items}</div>;
}

class ContactsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: null
    };
  }

  componentDidMount() {
    fetchActiveContact(cContact => {
      this.setState({ contact: cContact });
    });
  }

  render() {
    const { contact } = this.state;

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
        ogimage[0].parentNode.insertBefore(newmeta, ogimage[0]);
      });
      ogimage.forEach(oldmeta => {
        oldmeta.parentNode.removeChild(oldmeta);
      });
    }

    return (
      <div>
        <section id='contact-top' className='wow contact-section-bg'>
          <div className='container-fluid row text-left'>
            <div className='col-md-1' />
            <div className='col-md-10'>
              <h3 className='contactpage-title'>{contact.page_title}</h3>
              <h1>{contact.page_subtitle}</h1>
            </div>
            <div className='col-md-1' />
          </div>
        </section>

        <section id='contact-core-value'>
          <div className='container-fluid'>
            <AddressListContextConsumer>
              {value => (
                <Items dnas={contact.dnas} addresses={value.addresses} />
              )}
            </AddressListContextConsumer>
          </div>
        </section>

        <section id='contact-social-media'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-1' />
              <div className='col-md-10'>
                <h3 className='contactpage-title'>
                  {contact.social_media_title}
                </h3>
                <SocialMedia items={contact.social_media} />
              </div>
              <div className='col-md-1' />
            </div>
          </div>
        </section>

        <section id='contact-form'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-1' />
              <div className='col-md-10'>
                <h3 className='contactpage-title'>
                  {contact.contact_form_title}
                </h3>
                <h2>{contact.contact_form_desc}</h2>
                <ContactForm />
              </div>
              <div className='col-md-1' />
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
