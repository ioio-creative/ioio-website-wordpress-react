import asyncLoadingComponent from '../AsyncLoadingComponentt';
import withTracker from 'components/WithTracker';

/**
 * !!!Note!!!
 * No need to use withTracker any more as Google Tag Manager automatically do it for me!
 * https://www.twinword.com/blog/google-tag-manager-need-website/
 * Tag Manager can listen to browser history changes!
 */
export default function asyncLoadingComponentWithTracker(funcToImportPage) {
  return withTracker(asyncLoadingComponent(funcToImportPage));
}
