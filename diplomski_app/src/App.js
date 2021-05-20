import logo from './logo.svg';
import './App.css';
import MapGenerator from './MapGenerator';




function App() {
  return (
    <div className="App">
       <div id="mainWindow">
      <div>
        <div>
          <form encType="multipart/form-data" method="post" id="uploadForm" onClick="this.style.visibility='hidden';">
            <div className="field">
              <label className="file-upload">
                <input type="file" name="file" id="inFile" />
              </label>
            </div>
          </form>
        </div>
      </div>
    </div >
      <MapGenerator></MapGenerator>
    </div>
  );
}

export default App;
