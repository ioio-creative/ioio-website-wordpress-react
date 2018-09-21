// https://stackoverflow.com/questions/486896/adding-a-parameter-to-the-url-with-javascript
export default function insertParamToQueryInCurrentUrl(key, value) {
  key = encodeURI(key);
  value = encodeURI(value);

  let kvp = document.location.search.substr(1).split('&');

  let i = kvp.length; 
  let x;
  while (i--) {
    x = kvp[i].split('=');

    if (x[0] === key) {
        x[1] = value;
        kvp[i] = x.join('=');
        break;
    }
  }

  if (i < 0) {
    kvp[kvp.length] = [key,value].join('=');
  }

  let queryString = kvp.join('&');
  if (queryString[0] === '&') {
    queryString = queryString.substr(1, queryString.length - 1);
  }
  queryString = '?' + queryString;
  
  let currentPathname = document.location.pathname;
  if (currentPathname[currentPathname.length - 1] === '/') {
    currentPathname = currentPathname.substr(0, currentPathname.length - 1);
  }
  return currentPathname + queryString;
}