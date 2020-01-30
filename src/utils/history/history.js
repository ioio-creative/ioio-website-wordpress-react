/* References:
Prevent react-router history.push from reloading current route
https://stackoverflow.com/questions/37896855/prevent-react-router-history-push-from-reloading-current-route
https://github.com/ReactTraining/react-router/blob/master/FAQ.md#how-do-i-access-the-history-object-outside-of-components
https://codesandbox.io/s/owQ8Wrk3
*/


import { createBrowserHistory } from 'history';

const customHistory = createBrowserHistory();
export default customHistory;