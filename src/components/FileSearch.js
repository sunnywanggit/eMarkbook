import React, {useEffect, useState} from 'react';

const FileSearch = ({title, onFileSearch}) => {
    const [inputActive, setInputActive] = useState(false);
    let [value, setValue] = useState('');

    const closeSearch=(event)=>{
        event.preventDefault();
        setInputActive(false);
        setValue('')
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

    return (
        <div className="alert alert-primary">
            {
                !inputActive &&
                <div className="d-flex justify-content-between align-items-center">
                    <span>{title}</span>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={()=>{setInputActive(true)}}
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
