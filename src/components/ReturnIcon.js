import './ReturnIcon.css';
import React from 'react';
import styled from 'styled-components';


const ReturnIconStyleComponent = styled.span`
  height: 1em;
  display: inline-block;
  position: relative;
  padding-left: 0.4em;
  padding-right: 1vw;

  /*
  padding-left:0;
  padding-right: 11px;
  margin-right:10px;
  top:9px;
  */

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

    /*
    width: 34px;
    height: 21px;
    */
  }

  &:after {
    width: ${props => props.arrowSize};
    height: ${props => props.arrowSize};
    border-top: ${props => `${props.borderWidth} ${props.borderStyle} ${props.color}`};
    border-right: ${props => `${props.borderWidth} ${props.borderStyle} ${props.color}`};
    transform: ${props => `translateX(calc(${props.beforeWidth} - ${props.arrowSize} + 0.5 * ${props.borderWidth})) translateY(calc(-0.5 * ${props.borderWidth})) rotate(45deg)`};
    transform-origin: top right;

    /*
    width: 1vw;
    height: 1vw;
    right: 10px;
    */
  }

  @media (max-width: 768px) {
    padding-left: 1vw;
    margin: 0 .5em 0 0em;
    top: -0.5em;

    /*
    padding-left: 1vw;
    margin: 0 1em 0 0.5em;
    top: -0.5em;
    */

    &:before {
      width: 20px;
      height: 31px;
      border-width: 2px;

      /*
      width: 0;
      border-width: 2px;
      */
    }

    &:after {
      width: 3vw;
      height: 3vw;
      border-width: 2px;
      transform: translate(0, -1px) rotate(45deg);

      /*
      width: 3vw;
      height: 3vw;
      border-width: 2px;
      transform: rotate(45deg) translate(0, -1px);
      */
    }
  }
`;


function ReturnIcon(props) {
  let {
    color, borderWidth, borderStyle, beforeWidth, beforeHeight, arrowSize
  } = props;

  color = color || '#000';
  borderWidth = borderWidth || '0.15vw';
  borderStyle = borderStyle || 'solid';
  beforeWidth = beforeWidth || '1vw';
  beforeHeight = beforeHeight || '2vw';
  arrowSize = arrowSize || '0.5vw';

  return (
    <ReturnIconStyleComponent 
      color={color}
      borderWidth={borderWidth}
      borderStyle={borderStyle}
      beforeWidth={beforeWidth}
      beforeHeight={beforeHeight}
      arrowSize={arrowSize}
    />
  );
}


export default ReturnIcon;