import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch';
import FileList from './components/FileList';
import defaultFiles from './utils/defaultFiles';
import BottomBtn from './components/BottomBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import TabList from './components/TabList';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
function App() {
  const [files,setFiles] = useState(defaultFiles)
  const [activeFileId,setActiveFileId] = useState('')
  const [openedFileIds,setOpenedFileIds] = useState([])
  const [unSavedIds,setUnSavedIds] = useState([])

  const openedFiles = openedFileIds.map(openId=>{
    return files.find(file=>file.id === openId)
  })

  const activeFile = files.find(file=>file.id === activeFileId)

  console.log('openedFiles',openedFiles)


  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
          <div className="col-3 left-panel">
              <FileSearch
                  title="eMarkdown"
                  onFileSearch={(value)=>{console.log(value);}}
              />
              <FileList files={files}
                        onFileClick={(id)=>{console.log(id);}}
                        onFileDelete={(id)=>{console.log('delete',id);}}
                        onSaveEdit={(id,newValue)=>{ console.log(id,newValue);}}
              />
              <div className="row no-gutters button-group">
                <div className="col">
                  <BottomBtn
                    text="新建"
                    colorClass="btn-primary"
                    icon={faPlus}
                  />
                </div>
                <div className="col">
                  <BottomBtn
                    text="导入"
                    colorClass="btn-success"
                    icon={faPlus}
                  />
                </div>

              </div>
          </div>
          <div className="col-9 right-panel">
            {
              !activeFile &&
              <div className='start-page'>
                请选择或者创建新的 Markdown 文档
              </div>
            }
            {
              activeFile &&
              <>
                <TabList
                  files={openedFiles}
                  activeId={activeFileId}
                  unsaveIds={unSavedIds}
                  onTabClick={(id)=>{console.log(id)}}
                  onCloseTab={()=>{console.log('on-close-tab')}}
                />
                <SimpleMDE
                  value={activeFile &&  activeFile.body}
                  onChange={(value)=>{console.log(value)}}
                  options={{
                    minHeight:'515px'
                  }}
                />
              </>
            }
          </div>
      </div>
    </div>
  );
}

export default App;
