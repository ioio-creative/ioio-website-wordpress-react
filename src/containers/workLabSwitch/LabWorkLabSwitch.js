import React from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import routes from 'globals/routes';
import './LabWorkLabSwitch.css'

export default function LabWorkLabSwitch(props) {
  //const props = this.props;
  let onClickFunc = () => {};
  if (props.onClick) {
    onClickFunc = () => {
      props.onClick();
    };
  }

  return (
    <Link className="lab-to-work-switch"
      role="button"
      to={routes.home}
      onClick={onClickFunc}
    >
      <h4 className="lab-to-work-switch-txt">
        <FormattedMessage
          id="LabWorkLabSwitch.switchDestination"
          defaultMessage="Works"
        />        
      </h4>
    </Link>
  );  
}
