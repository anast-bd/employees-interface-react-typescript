const ADD_NOTE = 'ADD_NOTE';

export interface NotesState {
    notes: string[]
}

const initialState: NotesState = {
    notes: []
}

type Action = {type: 'ADD_NOTE', payload: string}

export const notesReducer = (state = initialState, action: Action) => {
    switch(action.type){
        case "ADD_NOTE": {
            return {...state, notes: [...state.notes, action.payload]}
        }
        default:
             return state
    }
}

export const addNote = (note: string):Action => ({
    type: ADD_NOTE,
    payload: note
})

