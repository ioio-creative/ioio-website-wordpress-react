import queryString from 'query-string';

export default function getSearchObjectFromHistory(history) {
  return queryString.parse(history.location.search);
};
