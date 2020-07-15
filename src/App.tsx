import React from 'react';
import './App.css';
import NewNote from './components/NewNote'

function App() {
  return (
    <div className="App">
      <NewNote addNote={alert}/>
      <ul>
        <li>Some note</li>
      </ul>
    </div>
  );
}

export default App;
