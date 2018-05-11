import React from 'react'

import './ContactForm.css'
import $ from 'jquery'

import {fetchActiveContact} from 'websiteApi';
//import gapi from 'gapi'

//import nodemailer from 'nodemailer'

function sendEmail() {}

const ContactForm = () => (<form className="contact-form" method="POST" action="https://formspree.io/info@ioioproduction.com">
  <div className="form-field">

    <label htmlFor="fname" className="form-l">
      <div className="label-content">First Name</div>
      <input type="text" name="firstname" placeholder="First Name" required="required"/>
    </label>
    <label htmlFor="lname" className="form-r">
      <div className="label-content">Last Name</div>
      <input type="text" name="lastname" placeholder="Last Name" required="required"/>
    </label>

  </div>

  <div className="form-field" >
    <label htmlFor="email" className="form-l">
      <div className="label-content">Email</div>
      <input type="email" name="_replyto" name="email" placeholder="Email" required="required"/>
    </label>
    <label htmlFor="phone" className="form-r">
      <div className="label-content">Phone</div>
      <input type="phone" name="phone" name="phone" placeholder="Phone" />
    </label>
  </div>

  <div className="form-field">
    <label htmlFor="companyname" className="form-l">
      <div className="label-content">Company Name</div>
      <input type="companyname" name="companyname" name="companyname" placeholder="Company Name" />
    </label>
    <label htmlFor="role" className="form-r">
      <div className="label-content">Your title / role</div>
      <input type="role" name="role" name="role" placeholder="Your title / role" />
    </label>
  </div>

  <div className="form-field">
    <label htmlFor="message" className="form-full">
      <div className="label-content">Message</div>
      <textarea className="stretch" name="message" rows="5" placeholder="Please tell us a bit about what you're looking to collaborate on." required="required"/>
    </label>
  </div>

  <button className="sendBtn" type="submit" value="Send">Submit</button>

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
