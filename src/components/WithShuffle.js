import React, { Component } from 'react';

export default function withShuffle(WrappedComponent, shuffleSelectorClass) {
  const HOC = class extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {

      };

      // shuffle stuff
      this.shuffleRef = null;
      this.shuffle = null;
    }

    componentDidMount() {
      // The elements are in the DOM, initialize a shuffle instance.
      this.shuffle = createDefaultShuffle(this.shuffleRef, this.projectShuffleSelectorClass);

      // for first visiting of the page
      this.filterProjectsByQueryFromUrl();
    }

    componentWillUnmount() {
      
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props      
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };

  // https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
  HOC.displayName = `WithShuffle(${getDisplayName(WrappedComponent)})`;

  return HOC;
}
