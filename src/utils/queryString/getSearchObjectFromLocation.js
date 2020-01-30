import queryString from 'query-string';

export default function getSearchObjectFromLocation(location) {
  return queryString.parse(location.search);
};
