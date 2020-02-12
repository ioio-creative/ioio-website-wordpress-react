import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {useInView} from 'react-intersection-observer'

import routes from 'globals/routes';
import isFunction from 'utils/js/function/isFunction';

import './WorkWorkLabSwitch.scss';

const showTimeoutInMillis = 1500;

export default function WorkWorkLabSwitch(props) {  
  const {
    onClick, backgroundColor, color, showDelay
  } = props;

  const onClickFunc = isFunction(onClick) ? onClick : null;

  const [isShowTimeoutInMillisPassed, setShowTimeoutInMillisPassed] = useState(false);
  const [workToLabSwitchRef, inView, workToLabSwitchInViewEntry] = useInView({
    threshold: 0,
  });

  const isShow = isShowTimeoutInMillisPassed && inView;

  useEffect (_ => {   
    setTimeout(_ => {
      setShowTimeoutInMillisPassed(true);
    }, showTimeoutInMillis);

    return _ => {};
  }, []);

  const circleStyle = {
    backgroundColor: backgroundColor || 'black',
    transitionDelay: showDelay || '0s'
  };

  const textStyle = {
    color: color || 'white'
  };

  return (
    <div 
      ref={workToLabSwitchRef}
      className={`work-to-lab-switch ${isShow ? "show" : "hide"}`}      
    >
      <div className='switch-outer-container'>
        <div className='switch-inner-container'>
          <Link 
            role="button"
            to={routes.lab(true)}
            onClick={onClickFunc}          
          >
            <div className='circle' style={circleStyle}>
              <div className='text' style={textStyle}>
                <FormattedMessage
                  id="WorkWorkLabSwitch.switchDestination"
                  defaultMessage="LAB!"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}