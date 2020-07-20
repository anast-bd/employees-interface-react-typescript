import React from 'react';
import moment from 'react-moment'
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider} from '@material-ui/pickers'
import EmployeesList from './components/EmployeesList';

function App() {
  return (
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>  
      <div className="App">
        <div className='app-wrapper-content'>
          <EmployeesList />
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
