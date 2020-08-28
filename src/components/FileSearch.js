import React, {useEffect, useRef, useState} from 'react';

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
                        搜索
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
