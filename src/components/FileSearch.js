import React, {useEffect, useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import useKeyPress from "../hooks/useKeyPress";

const FileSearch = ({title, onFileSearch}) => {
    const [inputActive, setInputActive] = useState(false);
    let [value, setValue] = useState('');
    const enterPressed = useKeyPress(13);
    const escPressed = useKeyPress(27);

    const closeSearch=()=>{
        setInputActive(false);
        setValue('')
        onFileSearch('')

    };

    const inputElement = useRef(null);

    const searchInputActive=()=>{ setInputActive(true); };

    //按下 enter 查找搜索结果 按下 esc 退出搜索
    useEffect(()=>{
        if(enterPressed && inputActive){ onFileSearch(value) }
        if(escPressed && inputActive){ closeSearch() }
    });

    //点击搜索 input 自动完成聚焦
    useEffect(()=>{
        if(inputActive){ inputElement.current.focus(); }
    },[inputActive]);

    return (
        <div className="alert alert-primary d-flex justify-content-between align-items-center mb-0">
            {
                !inputActive &&
                <>
                    <span>{title}</span>
                    <button
                        type="button"
                        className="icon-button"
                        onClick={searchInputActive}
                    >
                        <FontAwesomeIcon icon={faSearch} size="lg" title="搜索" />
                    </button>
                </>
            }
            {
                inputActive&&
                    <>
                        <input className="form-control"
                            value={value}
                            onChange={(e)=>{setValue(value = e.target.value)}}
                            ref={inputElement}
                        />
                        <button
                            type="button"
                            className="icon-button"
                            onClick={closeSearch}
                        >
                            <FontAwesomeIcon icon={faTimes} size="lg" title="关闭" />
                        </button>
                    </>
            }
        </div>
    );
};
FileSearch.propTypes = {
    title:PropTypes.string,
    onFileSearch:PropTypes.func.isRequired,
};

FileSearch.defaultProps = {
    title:'eMarkdown'
};

export default FileSearch;
