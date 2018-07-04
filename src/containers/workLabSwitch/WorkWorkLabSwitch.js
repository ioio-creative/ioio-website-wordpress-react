import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import routes from 'globals/routes';

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
      <Link id="lab-work-lab-switch"
        role="button"
        className="menu-transition"
        to={routes.lab}
        onClick={onClickFunc}
      >
        <h4 id="work-lab-switch">Lab!</h4>
      </Link>
    );
  }
}