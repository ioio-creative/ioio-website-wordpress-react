import React from 'react';
import styled from 'styled-components';


const ReturnIconStyleComponent = styled.span`
  height: 1em;
  display: inline-block;
  position: relative;
  padding-left: ${props => props.paddingLeft};
  padding-right: ${props => props.paddingRight};
  transform: scale(${props => props.scale});

  &:before,
  &:after {
    content: '';
    display: block;
  }

  &:before {
    height: ${props => props.beforeHeight};
    width: ${props => props.beforeWidth};
    border-left: ${props => `${props.borderWidth} ${props.borderStyle} ${props.color}`};
    border-bottom: ${props => `${props.borderWidth} ${props.borderStyle} ${props.color}`};
  }

  &:after {
    width: ${props => props.arrowSize};
    height: ${props => props.arrowSize};
    border-top: ${props => `${props.borderWidth} ${props.borderStyle} ${props.color}`};
    border-right: ${props => `${props.borderWidth} ${props.borderStyle} ${props.color}`};
    transform: ${props => `translateX(calc(${props.beforeWidth} - ${props.arrowSize} + 0.5 * ${props.borderWidth})) translateY(calc(-0.5 * ${props.borderWidth})) rotate(45deg)`};
    transform-origin: top right;
  }
`;


function ReturnIcon(props) {
  let {
    color, paddingLeft, paddingRight, borderWidth, borderStyle, 
    beforeWidth, beforeHeight, arrowSize, scale
  } = props;

  color = color || '#000';
  paddingLeft = paddingLeft || '0.1em';
  paddingRight= paddingRight || '0.5em';
  borderWidth = borderWidth || '0.1em';
  borderStyle = borderStyle || 'solid';
  beforeWidth = beforeWidth || '1em';
  beforeHeight = beforeHeight || '1.5em';
  arrowSize = arrowSize || '0.75em';
  scale = scale || 1;

  return (
    <ReturnIconStyleComponent 
      color={color}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      borderWidth={borderWidth}
      borderStyle={borderStyle}
      beforeWidth={beforeWidth}
      beforeHeight={beforeHeight}
      arrowSize={arrowSize}
      scale={scale}
    />
  );
}


export default ReturnIcon;