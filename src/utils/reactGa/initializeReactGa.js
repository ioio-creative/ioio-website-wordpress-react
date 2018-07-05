import ReactGA from 'react-ga';
import config from 'globals/config';

export default function initializeReactGa() {
  // https://golightlyplus.com/setup-google-analytics-react-js-apps/
  // Add your tracking ID created from https://analytics.google.com/analytics/web/#home/
  ReactGA.initialize(config.gaTrackingId);
};