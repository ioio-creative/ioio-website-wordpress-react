import React, { Component } from 'react';
import ContactForm from 'react-simple-contact-form'
var dict = {
        "header":"Contact",
        "mailAddress":"your mail",
        "message":"your message",
        "sendMessage":"Mail send",
        "sendButton":"Send message"
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
            <div>
                <h2>Contacts Page</h2>
                <ContactForm data={dict} ></ContactForm>
            </div>
        );
    }
}

export default ContactsPage;
