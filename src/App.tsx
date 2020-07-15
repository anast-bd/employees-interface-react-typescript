import React from 'react';
import './App.css';
import NewNote from './components/NewNote';
import { useSelector, useDispatch } from 'react-redux';
import { NotesState } from './redux/notesReducer';
import { addNote } from './redux/notesReducer'

function App() {
  const notes = useSelector<NotesState, NotesState['notes']>((state) => state.notes)
  const dispatch = useDispatch()

  const onAddNote = (note : string) => {
    dispatch(addNote(note))
  }

  return (
    <div className="App">
      <NewNote addNote={onAddNote}/>
      <ul>
        {notes.map((note) => {
          return (
            <li>{note}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
