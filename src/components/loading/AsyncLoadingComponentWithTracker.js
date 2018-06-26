import { asyncLoadingComponent } from './AsyncLoadingComponent';
import { withTracker } from 'components/WithTracker';

function asyncLoadingComponentWithTracker(funcToImportPage) {
  return withTracker(asyncLoadingComponent(funcToImportPage));
}

export {
  asyncLoadingComponentWithTracker
};
