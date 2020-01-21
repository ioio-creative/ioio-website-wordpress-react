import isNonEmptyArray from './isNonEmptyArray';

export default function firstOrDefault(obj, defaultValue = null) {
  if (isNonEmptyArray(obj)) {
    return obj[0];
  }

  const keysInObj = Object.keys(obj);
  return keysInObj > 0 ? obj[keysInObj[0]] : defaultValue;
};