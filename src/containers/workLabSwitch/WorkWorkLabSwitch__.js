import React from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import routes from 'globals/routes';
import './WorkWorkLabSwitch__.css';

export default function WorkWorkLabSwitch(props) {  
  //const props = this.props;
  let onClickFunc = () => {};
  if (props.onClick) {
    onClickFunc = () => {
      props.onClick();
    };
  }

  return (
    <Link className="work-to-lab-switch"
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
