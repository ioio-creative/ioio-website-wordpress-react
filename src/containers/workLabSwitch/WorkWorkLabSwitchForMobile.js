import React from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import routes from 'globals/routes';
import isFunction from 'utils/js/function/isFunction';

import './WorkWorkLabSwitchForMobile.scss';

export default function WorkWorkLabSwitchForMobile(props) {  
  const {
    onClick
  } = props;
  
  const onClickFunc = isFunction(onClick) ? onClick : null;

  return (
    <Link className="work-to-lab-switch-for-mobile"
      role="button"
      to={routes.lab(true)}
      onClick={onClickFunc}
    >
      <h4 className="work-to-lab-switch-txt">
        <FormattedMessage
          id="WorkWorkLabSwitch.switchDestination"
          defaultMessage="Lab!"
        />         
      </h4>
    </Link>
  );
}
