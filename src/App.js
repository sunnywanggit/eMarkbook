import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch';

function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
          <div className="col-3 bg-danger left-panel">
              <FileSearch
                  title="eMarkdown"
                  onFileSearch={(value)=>{console.log(value);}}
              />
          </div>
          <div className="col-9 bg-primary right-panel">this is the right panel</div>
      </div>
    </div>
  );
}

export default App;
