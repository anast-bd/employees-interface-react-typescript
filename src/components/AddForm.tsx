import React, {FC, useState, ChangeEvent, MouseEvent} from 'react'
import { EmployeeId, DepartmentId, Employee, Department } from '../types/types'
import {TableCell, TableRow, Button, TextField} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import {makeStyles} from '@material-ui/core/styles'
import DoneIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'
import { KeyboardDatePicker } from '@material-ui/pickers'
import moment from 'moment'

type Props = {
  addEmployee: (employee: Employee) => void
  setAddMode: React.Dispatch<React.SetStateAction<boolean>>
  employees: Employee[]
  departments: Department[]
  getMentorName: (employeesMentorId: EmployeeId | undefined) => string
  getDepartmentName: (employeesDeparimentId: DepartmentId) => string
}

const useStyles = makeStyles((theme) => ({
  deleteButton: {
      marginLeft: '5px',
      pudding: '0px'
  }
}));

const AddForm: FC<Props> = props => {

  const classes = useStyles();

  //Iniitialize input change state
  const initialAddFormState = {
    newFirstName: '', newLastName: '', newDepartment: '', newPosition: '', newMentorId: '', newEmploymentDate: ''
  }
  const [newEmployee, setNewEmployee] = useState(initialAddFormState)

  // const [selectedDate, handleDateChange] = useState(new Date());

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setNewEmployee({ ...newEmployee, [name]: value })
  }
  const onAddClick = (event: MouseEvent<HTMLButtonElement>) => {
    const {newFirstName, newLastName, newDepartment, newPosition, newMentorId, newEmploymentDate} = newEmployee
    let id = Math.floor( Math.random() * Math.floor(1000) )
    let firstName = newFirstName
    let lastName = newLastName
    let department = parseInt(newDepartment, 10)
    let position = newPosition
    let mentorId = parseInt(newMentorId, 10)
    let employmentDate = moment(newEmploymentDate, 'DD-MM-YYYY').toDate()
    
    let newEmployeeTyped = {id, firstName, lastName, department, position, mentorId, employmentDate}
    event.preventDefault()
    if(!id || !firstName || !lastName || !department || !position || !employmentDate) {alert('Something is wrong!')}
    props.addEmployee(newEmployeeTyped)
    
    // Clear and hide add-form
    setNewEmployee(initialAddFormState)
    props.setAddMode(false)
    }

// Get mentor id and add it to a newEmployee
const handleMentorId = (event: any, value: string) => {
  let mentorName = value.split(' ')[0] 
  let mentor = props.employees.find(employee => { 
    if(employee.firstName === mentorName){
      return employee
    }})
  let mentorIdString = mentor!.id.toString() 
  setNewEmployee({ ...newEmployee, newMentorId: mentorIdString }) 
}

// Get mentor id and add it to a newEmployee
const handleDepartment = (event: any, value: string) => {
  let department = props.departments.find(department => { 
    if(department.name === value){ 
      return department
    }})
  let departmentString = department!.id.toString()
  setNewEmployee({ ...newEmployee, newDepartment: departmentString })
}

// Type setting and a new employee adding
  return (
    <TableRow>
      <TableCell>
          {/* id goes here  */}  
      </TableCell>
      <TableCell>
          <TextField  required
                      label='First Name'
                      size='small'
                      name='newFirstName'
                      value={newEmployee.newFirstName}
                      onChange={handleOnChange}>
          </TextField>
      </TableCell>
      <TableCell>
          <TextField  required
                      size='small'
                      label='Last Name'
                      name='newLastName'
                      value={newEmployee.newLastName}
                      onChange={handleOnChange}>
          </TextField>
      </TableCell>
      <TableCell>
          <Autocomplete   options={props.departments}
                          getOptionLabel={(option) => (option.name)}
                          includeInputInList
                          onInputChange={handleDepartment}
                          renderInput={(params) => 
                              <TextField {...params}
                                          name='newDepartment'
                                          label="Department"
                                          variant="outlined" />
                          }
          />
      </TableCell>
      <TableCell>
          <TextField  required
                      size='small'
                      label='Position'
                      name='newPosition'
                      value={newEmployee.newPosition}
                      onChange={handleOnChange}>
          </TextField>
      </TableCell>
      <TableCell>
          <Autocomplete   options={props.employees}
                          getOptionLabel={(option) => (option.firstName +' '+ option.lastName)}
                          includeInputInList
                          onInputChange={handleMentorId}
                          renderInput={(params) => 
                              <TextField {...params}
                                          name='newMentorId'
                                          label="Mentor"
                                          variant="outlined" />
                          }
          />
      </TableCell>
      <TableCell>
          <TextField  size='small'
                      name='newEmploymentDate'
                      value={newEmployee.newEmploymentDate}
                      onChange={handleOnChange}
                      label={'DD-MM-YYYY'}>
          </TextField>
        {/* <KeyboardDatePicker disableToolbar
                            variant="inline"
                            showTodayButton={true}
                            format="dd.mm.yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Employment Date"
                            value={selectedDate}
                            onChange={date => handleDateChange(selectedDate)}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }} /> */}
      </TableCell>
      <TableCell align="right">
          <Button color='primary' 
                  variant='contained'
                  onClick={onAddClick}>
                  <DoneIcon />
          </Button>
          <Button className={classes.deleteButton} 
                  color='secondary' 
                  variant='outlined'
                  onClick={() => props.setAddMode(false)}>
                  <CloseIcon />
          </Button>
      </TableCell>
  </TableRow>
  )
}

export default AddForm;