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
  const [searchFiles,setSearchFiles] = useState([])

  const openedFiles = openedFileIds.map(openId=>{
    return files.find(file=>file.id === openId)
  })

  const activeFile = files.find(file=>file.id === activeFileId)

  const fileClick = (fileId)=>{
    //set current file
    setActiveFileId(fileId)
    //if opened files dont't have current id

    if(!openedFileIds.includes(fileId)){
      //set opened file id
      setOpenedFileIds([...openedFileIds,fileId])
    }
  }

  const tabClick=(fileId)=>{
    setActiveFileId(fileId)
  }

  const closeTab=(fileId)=>{
    //remove current id form openedFileIds
    const tabsWithout = openedFileIds.filter(id => id !== fileId)
    setOpenedFileIds(tabsWithout)
    //set active to the first opeded tab if still tabs left
    if(tabsWithout.length > 0){
      setActiveFileId(tabsWithout[0])
    }else{
      setActiveFileId('')
    }
  }

  const fileChange=(id,value)=>{
    const newFiles = files.map(file=>{
      if(file.id === id){ file.body = value }
      return file
    })
    setFiles(newFiles)
    setUnSavedIds(...unSavedIds,id)
  }

  const fileDelete=(id)=>{
    const newFiles = files.filter(file=>file.id !== id)
    setFiles(newFiles)
    //close the tab if open
    closeTab(id)
  }

  const updateFileName=(id,newTitle)=>{
    const newFiles = files.map(file=>{
      if(file.id === id){
        file.title = newTitle;
      }
      return file;
    })
    setFiles(newFiles)
  }

  const fileSearch=(keyword)=>{
    console.log('fileSearsh')
    const newFiles = files.filter(file=>file.title.includes(keyword))
    console.log('newFiles',newFiles)
    setSearchFiles(newFiles)
  }

  const fileListArr = (searchFiles.length > 0) ? searchFiles : files;



  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
          <div className="col-3 left-panel">
              <FileSearch
                  title="eMarkdown"
                  onFileSearch={fileSearch}
              />
              <FileList files={fileListArr}
                        onFileClick={fileClick}
                        onFileDelete={fileDelete}
                        onSaveEdit={updateFileName}
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
                  onTabClick={tabClick}
                  onCloseTab={closeTab}
                />
                <SimpleMDE
                  key={activeFile && activeFile.id}
                  value={activeFile &&  activeFile.body}
                  onChange={(value)=>{fileChange(activeFile.id,value)}}
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
