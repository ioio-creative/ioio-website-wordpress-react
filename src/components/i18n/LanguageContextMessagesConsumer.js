/**
 * Important:
 * The function of this component LanguageContextMessagesConsumer is
 * basically the same as that of injectIntl() HOC of react-intl.
 * So its use is going to be deprecated.
 */


import React, {Component} from 'react';

import {LanguageContextConsumer} from 'globals/contexts/languageContext';

class LanguageContextMessagesConsumer extends Component {
  constructor(props) {
    super(props);
  }

  // using a render prop.
  render() {
    const props = this.props;
    return (
      <LanguageContextConsumer>
        {
          value => {
            return props.render(value.messages);
          }
        }
      </LanguageContextConsumer>
    );
  }
}

export default LanguageContextMessagesConsumer;