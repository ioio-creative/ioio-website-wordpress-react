import React, {Component} from 'react';

import WorkWorkLabSwitch from 'containers/workLabSwitch/WorkWorkLabSwitch';

export default class BrightHeader extends Component {
  render() {
    return (
      <div>
        Bright Header
        <WorkWorkLabSwitch />
      </div>
    );
  }
}