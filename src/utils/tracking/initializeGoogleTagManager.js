import TagManager from 'react-gtm-module';
import { config } from 'globals/config';

export default function initializeGoogleTagManager() {
  // https://www.npmjs.com/package/react-gtm-module
  TagManager.initialize(config.googleTagManagerOptions);
}
