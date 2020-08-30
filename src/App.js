import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch';
import FileList from './components/FileList';
import defaultFiles from './utils/defaultFiles';
import BottomBtn from './components/BottomBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import TabList from './components/TabList';

function App() {
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
          <div className="col-3 left-panel">
              <FileSearch
                  title="eMarkdown"
                  onFileSearch={(value)=>{console.log(value);}}
              />
              <FileList files={defaultFiles}
                        onFileClick={(id)=>{console.log(id);}}
                        onFileDelete={(id)=>{console.log('delete',id);}}
                        onSaveEdit={(id,newValue)=>{ console.log(id,newValue);}}
              />
              <div className="row no-gutters">
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
            <TabList
              files={defaultFiles}
              activeId='1'
              unsaveIds={['1']}
              onTabClick={(id)=>{console.log(id)}}
              onCloseTab={()=>{console.log('on-close-tab')}}
            />
          </div>
      </div>
    </div>
  );
}

export default App;
