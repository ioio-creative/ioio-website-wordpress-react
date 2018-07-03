function createGeneralKeyValuePairs(sourceObjs, keyFieldSelectorFunc, valueFieldSelectorFunc) {
  let keyValuePairs = {};
  sourceObjs.forEach((sourceObj) => {
    keyValuePairs[keyFieldSelectorFunc(sourceObj)] = valueFieldSelectorFunc(sourceObj);
  });
  return keyValuePairs;
}

function createIdNamePairs(sourceObjs) {
  return createGeneralKeyValuePairs(sourceObjs,
    (sourceObj) => (sourceObj.id),
    (sourceObj) => (sourceObj.name));    
}

function createNameIdPairs(sourceObjs) {
  return createGeneralKeyValuePairs(sourceObjs,
    (sourceObj) => (sourceObj.name),
    (sourceObj) => (sourceObj.id));    
}

function createIdSlugPairs(sourceObjs) {
  return createGeneralKeyValuePairs(sourceObjs,
    (sourceObj) => (sourceObj.id),
    (sourceObj) => (sourceObj.slug));
}

function createSlugIdPairs(sourceObjs) {
  return createGeneralKeyValuePairs(sourceObjs, 
    (sourceObj) => (sourceObj.slug), 
    (sourceObj) => (sourceObj.id)); 
}

export {
  createGeneralKeyValuePairs,
  createIdNamePairs,
  createNameIdPairs,
  createIdSlugPairs,
  createSlugIdPairs
};