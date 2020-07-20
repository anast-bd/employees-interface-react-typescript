// import 'date-fns';
import React from 'react';

import { KeyboardDatePicker } from '@material-ui/pickers'

export default function DatePicker(props) {
  // The first commit of Material-UI

  return (
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          showTodayButton={true}
          format="dd.mm.yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Employment Date"
          value={props.selectedDate}
          onChange={props.setSelectedDate(props.selectedDate)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }} />
  );
}
