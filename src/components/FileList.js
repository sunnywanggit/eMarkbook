import React, {useEffect, useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash,faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types';
import useKeyPress from "../hooks/useKeyPress";

const FileList = ({files,onFileClick,onSaveEdit,onFileDelete})=>{

    const [editStatus,setEditStatus] = useState(false);
    const [value,setValue] = useState('');
    const enterPressed = useKeyPress(13);
    const escPressed = useKeyPress(27);

    const inputElement = useRef(null)

    const closeSearch = ()=>{
        setEditStatus(false)
        setValue('')
    }

    useEffect(()=>{
        if(escPressed && editStatus){
            const editItem = files.find(file => file.id === editStatus);
            onSaveEdit(editItem.id,value)
            setEditStatus(false)
            setValue('')
        }

        if(escPressed && editStatus){ closeSearch() }
    });

    useEffect(()=>{
        if(editStatus){ inputElement.current.focus(); }
    },[editStatus]);

    return(
        <ul className="list-group list-group-flush file-list">
            {
                files.map(file=>(
                    <li
                        className="list-group-item bg-light row d-flex align-items-center file-item mx-0"
                        key={file.id}
                    >
                    {
                        (file.id !== editStatus) &&
                        <>
                            <span className="col-2">
                            <FontAwesomeIcon icon={faMarkdown} size="lg" title="markdown" />
                            </span>

                            <span className="col-6 c-link"
                            onClick={()=>{onFileClick(file.id)}}
                            >{file.title}</span>

                            <button
                            type="button"
                            className="icon-button col-2"
                            onClick={()=>{setEditStatus(file.id);setValue(file.title)}}
                            >
                            <FontAwesomeIcon icon={faEdit} size="lg" title="编辑" />
                            </button>

                            <button
                            type="button"
                            className="icon-button col-2"
                            onClick={()=>{onFileDelete(file.id)}}
                            >
                            <FontAwesomeIcon icon={faTrash} size="lg" title="删除" />
                            </button>
                        </>
                        }
                        {
                            (file.id === editStatus) &&
                            <>
                                <input className="form-control col-10"
                                    value={value}
                                    ref={inputElement}
                                    onChange={(e)=>{setValue(e.target.value)}}
                                />
                                <button
                                    type="button"
                                    className="icon-button col-2"
                                    onClick={closeSearch}
                                >
                                    <FontAwesomeIcon icon={faTimes} size="lg" title="关闭" />
                                </button>
                            </>
                        }
                    </li>
                ))
            }
        </ul>
    )
};

FileList.propTypes = {
    files:PropTypes.array,
    onFileClick:PropTypes.func,
    onFileDelete:PropTypes.func,
    onSaveEdit:PropTypes.func
};

export default FileList;
