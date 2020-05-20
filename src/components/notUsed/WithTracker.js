/**
 * From ReactGA Community Wiki Page https://github.com/react-ga/react-ga/wiki/React-Router-v4-withTracker
 */
/**
 * !!!Note!!!
 * No need to use withTracker any more as Google Tag Manager automatically do it for me!
 * https://www.twinword.com/blog/google-tag-manager-need-website/
 * Tag Manager can listen to browser history changes!
 */

import React, { Component } from 'react';
import ReactGA from 'react-ga';

import getDisplayName from 'utils/react/getDisplayName';

export default function withTracker(WrappedComponent, options = {}) {
  const trackPage = page => {
    ReactGA.set({
      page,
      ...options
    });
    ReactGA.pageview(page);
  };

  const HOC = class extends Component {
    componentDidMount() {
      const page = this.props.location.pathname;
      trackPage(page);
    }

    componentDidUpdate(prevProps) {
      const previousPage = prevProps.location.pathname;
      const currentPage = this.props.location.pathname;

      // this case almost never happens
      if (currentPage !== previousPage) {
        trackPage(currentPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  // https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
  HOC.displayName = `WithTracker(${getDisplayName(WrappedComponent)})`;

  return HOC;
}
