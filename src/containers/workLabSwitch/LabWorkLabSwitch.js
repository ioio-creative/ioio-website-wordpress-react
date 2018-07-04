import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import routes from 'globals/routes';
import './LabWorkLabSwitch.css'

export default class LabWorkLabSwitch extends Component {
  render() {
    const props = this.props;
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
        <h4 className="lab-to-work-switch-txt">Work</h4>
      </Link>
    );
  }
}