
interface NotesState {
    notes: string[]
}

const initialState: NotesState = {
    notes: []
}

type Action = {type: 'ADD_NOTE', payload: string}

export const notesReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_NOTE": {
            return {...state, notes: [...state.notes, action.payload]}
        }
        default:
             return state
    }
}

