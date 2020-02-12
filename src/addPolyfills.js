/**
 * Do feature detection, to figure out which polyfills needs to be imported.
 **/


function isFeatureAbsent(featureName) {
  return !(featureName in window);
}



async function addPolyfills() {
  // https://www.npmjs.com/package/react-intersection-observer#polyfill
  if (isFeatureAbsent('IntersectionObserver')) {
    console.log('Polyfill of IntersectionObserver added');    
    await import('intersection-observer');
  }
}


export default addPolyfills;