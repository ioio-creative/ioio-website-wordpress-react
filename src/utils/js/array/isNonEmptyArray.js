export default function isNonEmptyArray(obj) {
  return Array.isArray(obj) && obj.length > 0;
};