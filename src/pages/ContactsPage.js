import React, { Component } from 'react';
import ContactForm from 'react-simple-contact-form'

import './ContactsPage.css';

var dict = {
        "header":"Send Us A Mail",
        "mailAddress":"Yout Email",
        "message":"Your Message",
        "sendMessage":"Mail send",
        "sendButton":"Send"
      }
class ContactsPage extends Component {

  /*
  "contact":{
          "header":"Contact",
          "mailAddress":"your mail",
          "message":"your message",
          "sendMessage":"Mail send",
          "sendButton":"Send message"
        }
  */



    render() {
        return (
          <section id="contact-form" className="container-fluid">
            <div className="container">
                <ContactForm data={dict} ></ContactForm>
            </div>
          </section>
        );
    }
}

export default ContactsPage;
