import React from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import routes from 'globals/routes';
import isFunction from 'utils/js/function/isFunction';

import './LabWorkLabSwitch.scss'


export default function LabWorkLabSwitch(props) {
  const {
    onClick
  } = props;

  const onClickFunc = isFunction(onClick) ? onClick : null;

  return (
    <Link className="lab-to-work-switch"
      role="button"
      to={routes.home(true)}
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
