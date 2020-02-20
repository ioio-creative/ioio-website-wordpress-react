import './LazyProgressiveImage.scss';

import React, {useState, useRef} from 'react';
import {useInView} from 'react-intersection-observer';
import {useIsSmallerThanOrEqualToSmallViewport} from 'hooks/ui/viewport';


// https://css-tricks.com/the-complete-guide-to-lazy-loading-images/
// http://www.chrisjhill.co.uk/article/gracefully-loading-images
function LazyProgressiveImage(props) {
  const {
    src, alt, imgContainerClassName, imgClassName, width, height, placeHolderColor,
    isRequirePaddingTopForPlaceHolder, placeHolderAspectRatio, placeHolderAspectRatioForMobile, isForceUsePlaceHolderAspectRatioAfterLoad,
    inViewRootMargin
  } = props;

  const [isFirstInViewPassed, setIsFirstInViewPassed] = useState(false);
  const [renderedImgSize, setRenderedImgSize] = useState(null);

  const imgRef = useRef(null);

  // rootMargin must be specified in pixels or percent
  // so can't use rootMargin: '0 0 500px 0'
  const [inViewRef, inView, inViewEntry] = useInView({
    trigger: 0,
    rootMargin: inViewRootMargin || '0px 0px 500px 0px',
    triggerOnce: true
  });

  const isSmallerThanOrEqualToSmallViewport = useIsSmallerThanOrEqualToSmallViewport();

  // if (src.length >= 3 && src.substr(src.length - 3) === 'gif') {  // special gif case
  //   if (inViewEntry && inViewEntry.target) {
  //     //const img = inViewEntry.target;  // now inViewRef refers to background rather than img
  //     const img = imgRef.current;
  //     img.src = img.dataset.src;
  //     if (!isImgLoaded) {
  //       setIsImgLoaded(true);
  //     }      
  //   }
  // } else {  // normal case
    if (inView) {
      if (!isFirstInViewPassed) {
        setIsFirstInViewPassed(true);
        //const img = inViewEntry.target;  // now inViewRef refers to background rather than img
        const img = imgRef.current;
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
          //console.log('Image load complete:', img.src);
          handleImgLoad();
        } else {
          // https://stackoverflow.com/questions/44728228/are-onload-event-handlers-automatically-released-after-execution
          img.addEventListener('load', handleImgLoad, { once: true });
        }      
      }
    }
  // }

  const placeHolderAspectRatioToUse = (isSmallerThanOrEqualToSmallViewport && Boolean(placeHolderAspectRatioForMobile)) ? placeHolderAspectRatioForMobile : placeHolderAspectRatio;
  const backgroundPaddingTopRatio = placeHolderAspectRatioToUse ? 1/placeHolderAspectRatioToUse : 9/16;

  const backgroundStyle = {    
    backgroundColor: placeHolderColor || 'rgba(227, 228, 229, 1)'
  };

  if (isRequirePaddingTopForPlaceHolder) {
    backgroundStyle.padding = (backgroundPaddingTopRatio * 100) + '% 0 0 0';
  }

  const isImgLoaded = Boolean(renderedImgSize);
  if (isImgLoaded) {
    if (isRequirePaddingTopForPlaceHolder) {
      if (!isForceUsePlaceHolderAspectRatioAfterLoad) {
        backgroundStyle.padding = (renderedImgSize.height / renderedImgSize.width * 100) + '% 0 0 0';
      }      
    }
  }

  /**
   * !!!Important!!!
   * Use background instead of img as inViewRef
   * as initially img may not have correct size for IntersectionObserver to observe
   * because the image is not loaded yet.
   */

  return (
    <div
      ref={inViewRef}
      className={`${imgContainerClassName || ''} lazy-progressive-image ${isImgLoaded ? 'clear' : 'blur'}`}
      style={backgroundStyle}
    >
      {/* <div
        ref={inViewRef}
        className={`background `}
        style={backgroundStyle}
      /> */}
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