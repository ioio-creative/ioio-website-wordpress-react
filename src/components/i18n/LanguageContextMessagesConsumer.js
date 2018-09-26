import React, {Component} from 'react';

import {LanguageContext} from 'globals/contexts/languageContext';

class LanguageContextMessagesConsumer extends Component {
  constructor(props) {
    super(props);
  }

  // using a render prop.
  render() {
    const props = this.props;
    return (
      <LanguageContext.Consumer>
        {value => {
          return props.render(value.messages);
        }}
      </LanguageContext.Consumer>
    );
  }
}

export default LanguageContextMessagesConsumer;