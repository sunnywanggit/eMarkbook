import React ,{useState,useEffect}from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';

const BottomBtn=({text,colorClass,icon,onBtnClick})=>(
    <button
        type="button"
        className={`btn btn-block no-border ${colorClass}`}
        onClick={onBtnClick}
    >
        <FontAwesomeIcon icon={icon} size="lg"  />
        {text}
    </button>
)
BottomBtn.protoTypes = {
    text:PropTypes.string,
    colorClass:PropTypes.string,
    icon:PropTypes.element.isRequired,
    onBtnClick:PropTypes.func
}

BottomBtn.defaultProps={
    text:'新建'
}

export default BottomBtn;


