import React, {useEffect, useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types';

const FileList = ({files,onFileClick,onSaveEdit,onFileDelete})=>{
    return(
        <ul className="list-group list-group-flush file-list">
            {
                files.map(file=>(
                    <li
                        className="list-group-item bg-light row d-flex align-items-center file-item"
                        key={file.id}
                    >
                        <span className="col-2">
                            <FontAwesomeIcon icon={faMarkdown} size="lg" title="markdown" />
                        </span>

                        <span className="col-8">{file.title}</span>

                        <button
                            type="button"
                            className="icon-button col-1"
                            onClick={()=>{}}
                        >
                            <FontAwesomeIcon icon={faEdit} size="lg" title="编辑" />
                        </button>

                        <button
                            type="button"
                            className="icon-button col-1"
                            onClick={()=>{}}
                        >
                            <FontAwesomeIcon icon={faTrash} size="lg" title="删除" />
                        </button>
                    </li>
                ))
            }
        </ul>
    )
};

FileList.propTypes = {
    files:PropTypes.array

};

export default FileList;
