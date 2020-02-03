import './CrossButton.scss';

import React from 'react';


function CrossButton(props) {
  let {
    rotationInDeg, backgroundBorderRadius, backgroundSize, backgroundColor, strokeLength, strokeThickness, strokeColor, onClick
  } = props;

  rotationInDeg = rotationInDeg || 0;

  const crossButtonStyle = {
    transform: `rotate(${rotationInDeg}DEG)`
  };

  const backgroundStyle = {
    borderRadius: backgroundBorderRadius,
    width: backgroundSize,
    height: backgroundSize,
    backgroundColor: backgroundColor
  };

  const strokeStyle = {    
    width: strokeLength,
    height: strokeThickness,
    backgroundColor: strokeColor    
  };

  return (
    <div className="cross-button"
      style={crossButtonStyle}
      onClick={onClick}>
      <div className="background"
        style={backgroundStyle}
      >
        <div className="first-stroke" 
          style={strokeStyle}
        />
        <div className="second-stroke" 
          style={strokeStyle}
        />
      </div>
    </div>
  );
}

export default CrossButton;