import React, {useEffect, useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const FileSearch = ({title, onFileSearch}) => {
    const [inputActive, setInputActive] = useState(false);
    let [value, setValue] = useState('');

    const closeSearch=(event)=>{
        event.preventDefault();
        setInputActive(false);
        setValue('')
    };

    const inputElement = useRef(null);

    const searchInputActive=()=>{
        setInputActive(true);
    };

    //按下 enter 查找搜索结果 按下 esc 退出搜索
    useEffect(()=>{
        const handleInputEvent=(event)=>{
            console.log('value',event);
            const {keyCode} = event;
            if(keyCode === 13 && inputActive){
                onFileSearch(value)
            }else if(keyCode === 27 && inputActive){
                closeSearch(event)
            }
        };
        document.addEventListener('keyup',handleInputEvent);
        return ()=>{
            document.removeEventListener('keyup',handleInputEvent)
        }
    });

    //点击搜索 input 自动完成聚焦
    useEffect(()=>{
        if(inputActive){
            inputElement.current.focus();
        }
    },[inputActive]);

    return (
        <div className="alert alert-primary">
            {
                !inputActive &&
                <div className="d-flex justify-content-between align-items-center">
                    <span>{title}</span>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={searchInputActive}
                    >
                        <FontAwesomeIcon icon={faSearch}
                                         title="搜索"
                        />

                    </button>
                </div>
            }
            {
                inputActive&&
                    <div className="row">
                        <input className="form-control col-8"
                               value={value}
                               onChange={(e)=>{setValue(value = e.target.value)}}
                               ref={inputElement}
                        />
                        <button
                            type="button"
                            className="btn btn-primary col-4"
                            onClick={closeSearch}
                        >
                            关闭
                        </button>
                    </div>
            }
        </div>
    );
};

export default FileSearch;
