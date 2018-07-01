const labThumbClass = "lab-thumb";

const labTitleFromBottomClass = "lab-title-from-bottom";
const labDescFromBottomClass = "lab-desc-from-bottom";
const labSharingPresenterClass = "lab-sharing-presenter";

const hasCategoryColor = {
  opacity : '1',
  right:'25px',
};

const hasMediumCategoryColor = {
  color:'black',
  opacity : '1',
  left:'25px',
}

const hasSharingCategoryColor = {
  color:'#fccd05',
  opacity : '1',
  left:'25px',
}

const hasNoCategoryColor = {
  opacity : '0'
}

const mediumContainerStyle = (containerWidth) => {
  return {
    background: '#ffe000',
    height: containerWidth,
  };
} 

const sharingContainerStyle = (containerWidth) => {
  return {
    background: 'white',
    height: containerWidth,
  };
};

const blackText = {
  color: 'black',
};

const whiteText = {
  color: 'white',
};

const squareStyle = (containerWidth) => {
  return {
    background: 'transparent',
    color: 'black',
    width: containerWidth,
    height: containerWidth
  };
}
 
const longRectStyle = (containerWidth) =>{
  return {
    background: 'transparent',
    color: 'black',
    width: containerWidth,
    height: 'auto'
  };
}

const researchZeroStyle = (containerWidth) => {
  return {
    background: 'transparent',
    color: 'black',
    width: containerWidth,
    height: containerWidth / 2 * 1.3,
  };
}

const imgSquareStyle = (containerWidth) => {
  return {
    height: containerWidth,
  };
}

const imgLongRectStyle = {
  width: "100%",
  height: 'auto',
};

const imgNoImageStyle = (containerWidth) => {
  return {
    height: containerWidth
  };
}

const imgResearchZeroStyle = {
  width: '100%',
  height: 'auto',
};

const imgSharingStyle = {
  width: '100%',
  height: 'auto',
};

const showSharingPresenterStyle = {
  display : 'block'
}

const hideSharingPresenterStyle = {
  display : 'none'
}

const defaultStylesObj = {
  categoryColor: null,
  itemStyle: null,
  imgStyle: null,
  textTitleStyle: null,
  textDescStyle: null,
  classNameTitle: null,
  classNameDesc: null,
  sharingPresenterStyle: null,

  containerStyle: null,
  classNameImg: null,
  classSharingPresenter: labSharingPresenterClass,
};

const templateTypeStylesObjCreatorMapper = {
  '3': (containerWidth) => ({
    itemStyle: longRectStyle(containerWidth),
    imgStyle: imgLongRectStyle,
    textTitleStyle: whiteText,
    textDescStyle: whiteText,
    classNameTitle: labTitleFromBottomClass,
    classNameDesc: labDescFromBottomClass,
    sharingPresenterStyle: hideSharingPresenterStyle
  }),    
  '5': (containerWidth) => ({
    categoryColor: hasCategoryColor,
    itemStyle: researchZeroStyle(containerWidth),
    imgStyle: imgResearchZeroStyle,
    textTitleStyle: whiteText,
    textDescStyle: whiteText,
    classNameTitle: labTitleFromBottomClass,
    classNameDesc: labDescFromBottomClass,
    sharingPresenterStyle: hideSharingPresenterStyle
  }),   
  '6': (containerWidth) => ({
    categoryColor: hasMediumCategoryColor,        
    imgStyle: imgNoImageStyle(containerWidth),
    textTitleStyle: blackText,
    textDescStyle: blackText,
    classNameTitle: "lab-title-from-top",
    classNameDesc: "lab-desc-from-top",
    sharingPresenterStyle: showSharingPresenterStyle,

    containerStyle: mediumContainerStyle(containerWidth),
  }),  
  '7': (containerWidth) => ({
    categoryColor: hasSharingCategoryColor,      
    imgStyle: imgSharingStyle,
    textTitleStyle: blackText,
    textDescStyle: blackText,
    classNameTitle: "lab-title-from-top",
    classNameDesc: "lab-desc-from-top",
    sharingPresenterStyle: showSharingPresenterStyle,

    containerStyle: sharingContainerStyle(containerWidth),
    classNameImg: labThumbClass + " sharing",
  }),   
  '-1': (containerWidth) => ({
    categoryColor: hasNoCategoryColor,
    itemStyle: squareStyle(containerWidth),
    imgStyle: imgSquareStyle(containerWidth),
    textTitleStyle: whiteText,
    textDescStyle: whiteText,
    classNameTitle: labTitleFromBottomClass,
    classNameDesc: labDescFromBottomClass,
    sharingPresenterStyle: hideSharingPresenterStyle
  })
}

export default function getStylesByTemplateType(templateType,
  elementSize) {  
  const containerWidth = elementSize ? elementSize.width : 0; 
  const templateTypeStr = templateType.toString();
  const templateTypeStyleObjCreatorIdx = Object.keys(templateTypeStylesObjCreatorMapper).includes(templateTypeStr) ?
    templateTypeStr : '-1';
  const stylesObjToMerge = templateTypeStylesObjCreatorMapper[templateTypeStyleObjCreatorIdx](containerWidth);
  return Object.assign(defaultStylesObj, stylesObjToMerge);
};
