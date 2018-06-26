import Loadable from 'react-loadable';
import MyFirstLoadingComponent from './MyFirstLoadingComponent';

function asyncLoadingComponent(funcToImportPage, loadingComponent) {
  return Loadable({
    loader: funcToImportPage,
    loading: loadingComponent || MyFirstLoadingComponent
  });
}

export {
  asyncLoadingComponent
}
