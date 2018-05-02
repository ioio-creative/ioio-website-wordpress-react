import React from 'react'

import './ContactForm.css'
import $ from 'jquery'
//import gapi from 'gapi'

//import nodemailer from 'nodemailer'

function sendEmail() {}

const ContactForm = () => (
  <form className="contact-form" method="POST" action="https://formspree.io/info@ioioproduction.com">
  <div className="form-field">
          <div className="contact-us">CONTACT</div>
          <br />
          <br />
    <label htmlFor="name">
      <div className="label-content">Name:</div>
      <input type="text" name="name" required="required"/>
    </label>
  </div>

  <div className="form-field">
    <label htmlFor="email">
      <div className="label-content">Email:</div>
      <input type="email" name="_replyto" required="required"/>
    </label>
  </div>

  <div className="form-field">
    <label htmlFor="message">
      <div className="label-content">Message:</div>
      <textarea className="stretch" name="message" rows="5" required="required"/>
    </label>
  </div>

  <button className="sendBtn" type="submit" value="Send">Send</button>

  <div>
    {
      window.location.hash === '#success' && <div id="success">
          <p>Your message has been sent!</p>
        </div>
    }
    {
      window.location.hash === '#error' && <div id="error">
          <p>An error occured while submitting the form.</p>
        </div>
    }
  </div>

</form>)

export default ContactForm
