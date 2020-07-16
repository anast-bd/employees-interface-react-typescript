import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

export default function DatePicker() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  // const [selectedDate, setSelectedDate] = React.useState<Date | null>(
  //   new Date(),
  // );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  // const handleDateChange = (date: Date | null) => {
  //   setSelectedDate(date);
  // };


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }} />
    </MuiPickersUtilsProvider>
  );
}
