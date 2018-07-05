import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import routes from 'globals/routes';
import './WorkWorkLabSwitch.css';

export default class WorkWorkLabSwitch extends Component {
  render() {
    const props = this.props;
    let onClickFunc = () => {};
    if (props.onClick) {
      onClickFunc = () => {
        props.onClick();
      };
    }

    return (
      <Link className="work-to-lab-switch"
        role="button"
        to={routes.lab}
        onClick={onClickFunc}
      >
        <h4 className="work-to-lab-switch-txt">Lab!</h4>
      </Link>
    );
  }
}
