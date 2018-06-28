import Loadable from 'react-loadable';
import MyFirstLoadingComponent from './MyFirstLoadingComponent';

export default function asyncLoadingComponent(funcToImportPage, loadingComponent) {
  return Loadable({
    loader: funcToImportPage,
    loading: loadingComponent || MyFirstLoadingComponent
  });
}
