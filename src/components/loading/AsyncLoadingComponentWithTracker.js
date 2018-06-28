import asyncLoadingComponent from './AsyncLoadingComponent';
import withTracker from 'components/WithTracker';

export default function asyncLoadingComponentWithTracker(funcToImportPage) {
  return withTracker(asyncLoadingComponent(funcToImportPage));
};
