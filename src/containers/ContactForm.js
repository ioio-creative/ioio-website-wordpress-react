import React, { useCallback } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import './ContactForm.css';

//import gapi from 'gapi'
//import nodemailer from 'nodemailer'

const ContactForm = ({ intl }) => {
  const formatMessage = useCallback(
    (msgId, defaultMsg) => {
      return intl.formatMessage({
        id: msgId,
        defaultMessage: defaultMsg
      });
    },
    [intl]
  );
  return (
    <form
      className='contact-form'
      method='POST'
      action='https://formspree.io/info@ioioproduction.com'
    >
      <div className='form-field'>
        <label htmlFor='fname' className='form-l'>
          <div className='label-content'>
            <FormattedMessage
              id='ContactForm.firstNameLabel'
              defaultMessage='First Name'
            />
          </div>
          <input
            type='text'
            name='firstname'
            placeholder={formatMessage(
              'ContactForm.firstNameTextBoxPlaceHolder',
              'First Name'
            )}
            required
          />
        </label>
        <label htmlFor='lname' className='form-r'>
          <div className='label-content'>
            <FormattedMessage
              id='ContactForm.lastNameLabel'
              defaultMessage='Last Name'
            />
          </div>
          <input
            type='text'
            name='lastname'
            placeholder={formatMessage(
              'ContactForm.lastNameTextBoxPlaceHolder',
              'Last Name'
            )}
            required
          />
        </label>
      </div>

      <div className='form-field'>
        <label htmlFor='email' className='form-l'>
          <div className='label-content'>
            <FormattedMessage
              id='ContactForm.emailLabel'
              defaultMessage='Email'
            />
          </div>
          <input
            type='email'
            name='_replyto'
            name='email'
            placeholder={formatMessage(
              'ContactForm.emailTextBoxPlaceHolder',
              'Email'
            )}
          />
        </label>
        <label htmlFor='phone' className='form-r'>
          <div className='label-content'>
            <FormattedMessage
              id='ContactForm.phoneLabel'
              defaultMessage='Phone'
            />
          </div>
          <input
            type='phone'
            name='phone'
            placeholder={formatMessage(
              'ContactForm.phoneTextBoxPlaceHolder',
              'Phone'
            )}
          />
        </label>
      </div>

      <div className='form-field'>
        <label htmlFor='companyname' className='form-l'>
          <div className='label-content'>
            <FormattedMessage
              id='ContactForm.companyNameLabel'
              defaultMessage='Company Name'
            />
          </div>
          <input
            type='companyname'
            name='companyname'
            placeholder={formatMessage(
              'ContactForm.companyNameTextBoxPlaceHolder',
              'Company Name'
            )}
          />
        </label>
        <label htmlFor='role' className='form-r'>
          <div className='label-content'>
            <FormattedMessage
              id='ContactForm.titleOrRoleLabel'
              defaultMessage='Your title / role'
            />
          </div>
          <input
            type='role'
            name='role'
            placeholder={formatMessage(
              'ContactForm.titleOrRoleTextBoxPlaceHolder',
              'Your title / role'
            )}
          />
        </label>
      </div>

      <div className='form-field'>
        <label htmlFor='message' className='form-full'>
          <div className='label-content'>
            <FormattedMessage
              id='ContactForm.messageLabel'
              defaultMessage='Message'
            />
          </div>
          <textarea
            className='stretch'
            name='message'
            rows='5'
            placeholder={formatMessage(
              'ContactForm.messageTextBoxPlaceHolder',
              'Please tell us any interesting ideas we can work on together!'
            )}
            required
          />
        </label>
      </div>

      <button className='sendBtn' type='submit' value='Send'>
        <FormattedMessage
          id='ContactForm.submitButton'
          defaultMessage='Submit'
        />
      </button>

      <div>
        {window.location.hash === '#success' && (
          <div id='success'>
            <p>
              <FormattedMessage
                id='ContactForm.messageSendSuccessMessage'
                defaultMessage='Your message has been sent!'
              />
            </p>
          </div>
        )}
        {window.location.hash === '#error' && (
          <div id='error'>
            <p>
              <FormattedMessage
                id='ContactForm.messageSendErrorMessage'
                defaultMessage='An error occured while submitting the form.'
              />
            </p>
          </div>
        )}
      </div>
    </form>
  );
};

export default injectIntl(ContactForm);
