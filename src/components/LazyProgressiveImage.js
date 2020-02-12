import './LazyProgressiveImage.scss';

import React, {useState} from 'react';
import {useInView} from 'react-intersection-observer';


// https://css-tricks.com/the-complete-guide-to-lazy-loading-images/
// http://www.chrisjhill.co.uk/article/gracefully-loading-images
function LazyProgressiveImage(props) {
  const {
    src, alt, imgContainerClassName, imgClassName, width, height, placeHolderColor, placeHolderAspectRatio
  } = props;

  const [isFirstInViewPassed, setIsFirstInViewPassed] = useState(false);
  const [renderedImgSize, setRenderedImgSize] = useState(null);

  // rootMargin must be specified in pixels or percent
  // so can't use rootMargin: '0 0 500px 0'
  const [imgRef, inView, imgInViewEntry] = useInView({
    threshold: 0,
    rootMargin: '0px 0px 500px 0px',
    triggerOnce: true
  });

  // if (src.length >= 3 && src.substr(src.length - 3) === 'gif') {  // special gif case
  //   if (imgInViewEntry && imgInViewEntry.target) {
  //     const img = imgInViewEntry.target;
  //     img.src = img.dataset.src;
  //     if (!isImgLoaded) {
  //       setIsImgLoaded(true);
  //     }      
  //   }
  // } else {  // normal case
    if (inView) {
      if (!isFirstInViewPassed) {
       setIsFirstInViewPassed(true);
       const img = imgInViewEntry.target;
       img.src = img.dataset.src;
 
       function handleImgLoad() {
        setRenderedImgSize({
          width: img.width,
          height: img.height
        });
       } 
       
       // Images can sometimes be loaded from cache. In this case we need to
       // tell the image it has loaded, otherwise it might not fade in.
       // https://www.w3schools.com/jsref/prop_img_complete.asp
       if (img.complete) {
         handleImgLoad();
       } else {
         img.addEventListener('load', handleImgLoad);
       }      
     }
   }
  // }

  const backgroundAspectRatio = placeHolderAspectRatio ? 1/placeHolderAspectRatio : 9/16;

  const backgroundStyle = {
    padding: (backgroundAspectRatio * 100) + '% 0 0 0',
    backgroundColor: placeHolderColor || 'rgba(204, 204, 204, 125)'
  };

  const isImgLoaded = Boolean(renderedImgSize);
  if (isImgLoaded) {
    backgroundStyle.padding = (renderedImgSize.height / renderedImgSize.width * 100) + '% 0 0 0';
  }

  return (
    <div 
      className={`${imgContainerClassName || ''} lazy-progressive-image ${isImgLoaded ? 'clear' : 'blur'}`}
      style={backgroundStyle}
    >
      <img
        ref={imgRef}
        className={`${imgClassName || ''} ${isImgLoaded ? 'show' : 'hide'}`}        
        data-src={src}
        alt={alt}
      />
    </div>
  );
}


export default LazyProgressiveImage;