import queryString from 'query-string';

function getSearchObjectFromHistory(history) {
  return queryString.parse(history.location.search);
}

export default getSearchObjectFromHistory;