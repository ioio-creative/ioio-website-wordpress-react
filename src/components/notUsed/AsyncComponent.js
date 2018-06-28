// Code Splitting and React Router v4
// https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html

// Now we don't use this in Main.js. We now use the more sophisticated react-loadable library.

import React, { Component } from "react";

export default function asyncComponent(importComponent) {
  const HOC = class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  // https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
  HOC.displayName = `AsyncComponent(${getDisplayName(WrappedComponent)})`;

  return HOC;
}
