import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import EmployeesListContainer from './components/EmployeesListContainer';
import EditFormContainer from './components/EditFormContainer';
// import { NewFormContainer } from './components/NewFormContainer';

// import { useSelector, useDispatch } from 'react-redux';
// import { InitialStateType } from './redux/appReducer';
import { Employee, EmployeeId, Department } from './types/types';


function App() {
  // const notes = useSelector<NotesState, NotesState['notes']>((state) => state.notes)
  // const dispatch = useDispatch()

  // const onSetCurrentEmployee = (currentEmployeeId : EmployeeId) => {
  //   dispatch(setCurrentEmployee(currentEmployeeId))
  // }
  // const employees = useSelector<InitialStateType, InitialStateType['employees']>((state) => state.employees)
  // const departments = useSelector<InitialStateType, InitialStateType['departments']>((state) => state.departments)

  return (
    <BrowserRouter>
      <div className="App">
        <div className='app-wrapper-content'>
          <EmployeesListContainer />
          {/* <Route exact path='/new'  render={ () => <NewFormContainer />  } /> */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
