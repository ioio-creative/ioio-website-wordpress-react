import React, {Component} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';

import LanguageContextMessagesConsumer from 'components/i18n/LanguageContextMessagesConsumer';

import './ContactForm.css';

//import gapi from 'gapi'
//import nodemailer from 'nodemailer'

class ContactForm extends Component {
  render() {
    const props = this.props;    
    return (
      <form className="contact-form" method="POST" action="https://formspree.io/info@ioioproduction.com">
        <div className="form-field">
  
          <label htmlFor="fname" className="form-l">
            <div className="label-content">
              <FormattedMessage
                id="ContactForm.firstNameLabel"
                defaultMessage="First Name"
              />      
            </div>
            <LanguageContextMessagesConsumer
              render={(messages) => {            
                return (
                  <input type="text" name="firstname" placeholder={messages['ContactForm.firstNameTextBoxPlaceHolder']} required="required"/>
                );
              }}
            />
          </label>
          <label htmlFor="lname" className="form-r">
            <div className="label-content">
              <FormattedMessage
                id="ContactForm.lastNameLabel"
                defaultMessage="Last Name"
              />          
            </div>
            <LanguageContextMessagesConsumer
              render={(messages) => {            
                return (
                  <input type="text" name="lastname" placeholder={messages['ContactForm.lastNameTextBoxPlaceHolder']} required="required"/>
                );
              }}
            />          
          </label>
  
        </div>
  
        <div className="form-field" >
          <label htmlFor="email" className="form-l">
            <div className="label-content">
              <FormattedMessage
                id="ContactForm.emailLabel"
                defaultMessage="Email"
              />
            </div>
            <LanguageContextMessagesConsumer
              render={(messages) => {            
                return (
                  <input type="email" name="_replyto" name="email" placeholder={messages['ContactForm.emailTextBoxPlaceHolder']} required="required"/>
                );
              }}
            />          
          </label>
          <label htmlFor="phone" className="form-r">
            <div className="label-content">
              <FormattedMessage
                id="ContactForm.phoneLabel"
                defaultMessage="Phone"
              />
            </div>
            <input type="phone" name="phone" name="phone" placeholder={props.intl.formatMessage({
              id: "ContactForm.phoneTextBoxPlaceHolder",
              defaultMessage: "Phone"
            })} />
          </label>
        </div>
  
        <div className="form-field">
          <label htmlFor="companyname" className="form-l">
            <div className="label-content">
              <FormattedMessage
                id="ContactForm.companyNameLabel"
                defaultMessage="Company Name"
              />
            </div>
            <input type="companyname" name="companyname" name="companyname" placeholder="Company Name" />
          </label>
          <label htmlFor="role" className="form-r">
            <div className="label-content">
              <FormattedMessage
                id="ContactForm.titleOrRoleLabel"
                defaultMessage="Your title / role"
              />            
            </div>
            <input type="role" name="role" name="role" placeholder="Your title / role" />
          </label>
        </div>
  
        <div className="form-field">
          <label htmlFor="message" className="form-full">
            <div className="label-content">
              <FormattedMessage
                id="ContactForm.messageLabel"
                defaultMessage="Message"
              />            
            </div>
            <textarea className="stretch" name="message" rows="5" placeholder="Please tell us a bit about what you're looking to collaborate on." required="required"/>
          </label>
        </div>
  
        <button className="sendBtn" type="submit" value="Send">
          <FormattedMessage
            id="ContactForm.submitButton"
            defaultMessage="Submit"
          />        
        </button>
  
        <div>
          {
            window.location.hash === '#success'
            &&
            <div id="success">
              <p>
                <FormattedMessage
                  id="ContactForm.messageSendSuccessMessage"
                  defaultMessage="Your message has been sent!"
                />                
              </p>
            </div>
          }
          {
            window.location.hash === '#error' 
            && 
            <div id="error">
              <p>
                <FormattedMessage
                  id="ContactForm.messageSendErrorMessage"
                  defaultMessage="An error occured while submitting the form."
                />
              </p>
            </div>
          }
        </div>
  
      </form>
    );
  }  
}

export default injectIntl(ContactForm);
