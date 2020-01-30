import React, { Component } from 'react';

import createDefaultShuffle from 'utils/shuffle/createDefaultShuffle';
import getDisplayName from 'utils/react/getDisplayName';

// https://vestride.github.io/Shuffle/shuffle-with-react
export default function withShuffle(WrappedComponent) {
  const HOC = class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isShuffleSet: false
      };

      // shuffle stuff
      this.shuffle = null;

      // set by children via setWithShuffleParams
      this.shuffleRef = null;
      this.shuffleSelectorClass = '';  //'portfolio-item';
      this.filterFuncToRunAtComponentDidMount = null;
      this.filterFuncToRunAtComponentDidUpdate = null;

      this.setShuffleRef = this.setShuffleRef.bind(this);
      this.setWithShuffleParams = this.setWithShuffleParams.bind(this);
    }


    /* react lifecycle hooks */

    componentDidMount() {
      //console.log("WithShuffle: componentDidMount");

      // The elements are in the DOM, initialize a shuffle instance.
      this.shuffle = createDefaultShuffle(this.shuffleRef, this.shuffleSelectorClass);

      this.filterFuncToRunAtComponentDidMount(this.shuffle);
    }

    // http://busypeoples.github.io/post/react-component-lifecycle/
    componentDidUpdate() {
      //console.log("WithShuffle: componentDidUpdate");

      // Notify shuffle to dump the elements it's currently holding and consider
      // all elements matching the `itemSelector` as new.
      this.shuffle.resetItems();
      
      this.filterFuncToRunAtComponentDidUpdate(this.shuffle);
    }

    componentWillUnmount() {
      //console.log("WithShuffle: componentWillUnmount");

      // Dispose of shuffle when it will be removed from the DOM.
      this.shuffle.destroy();
      this.shuffle = null;
    }

    /* end of react lifecycle hooks */


    setShuffleRef(element) {
      this.shuffleRef = element;
    }

    setWithShuffleParams(shuffleSelectorClass,
      filterFuncToRunAtComponentDidMount, filterFuncToRunAtComponentDidUpdate) {
      //console.log("WithShuffle: setWithShuffleParams");

      this.shuffleSelectorClass = shuffleSelectorClass;
      this.filterFuncToRunAtComponentDidMount = filterFuncToRunAtComponentDidMount;
      this.filterFuncToRunAtComponentDidUpdate = filterFuncToRunAtComponentDidUpdate;
    }

    render() {
      //console.log("WithShuffle: render");
      
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <WrappedComponent
          setShuffleRefFunc={this.setShuffleRef}
          setWithShuffleParamsFunc={this.setWithShuffleParams}
          {...this.props} />
      );
    }
  };

  // https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
  HOC.displayName = `WithShuffle(${getDisplayName(WrappedComponent)})`;

  return HOC;
}
