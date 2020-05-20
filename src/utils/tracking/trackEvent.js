import ReactGA from 'react-ga';

export default function trackEvent(eventObj) {
  ReactGA.event(eventObj);
}
