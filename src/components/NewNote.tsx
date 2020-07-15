import React, {FC, ChangeEvent} from 'react';

interface NewNoteProps {
    addNote( note : String ): void
}

const NewNote: FC<NewNoteProps> = ({ addNote }) => {
    const [note, setNote] = React.useState('')

    const updateNote = (event:ChangeEvent<HTMLInputElement>) => {
        setNote(event.target.value)
    }

    const onAddNoteClick = () => {
        addNote(note);
        setNote('');
    }

    return (
        <>
            <input 
                onChange={updateNote} 
                value={note} 
                type='text' 
                name='note' 
                placeholder="Note" 
            />
            <button onClick={onAddNoteClick}>Add note</button>
        </>
    )
}

export default NewNote;