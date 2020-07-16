import { createStore } from 'redux'
import { rootReducer } from './appReducer'

export const store = createStore(rootReducer)