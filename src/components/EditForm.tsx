import React, { FC, useState, useEffect, ChangeEvent, MouseEvent } from 'react'
import { EmployeeId, DepartmentId, Employee, Department } from '../types/types'
import { TableCell, TableRow, Button, TextField} from '@material-ui/core'
import { initialCurrentEmployee }  from './EmployeesList'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import DoneIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  deleteButton: {
      marginLeft: '5px',
      pudding: '0px'
  }
}));

type Props = {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  employees: Employee[]
  departments: Department[]
  getMentorName: (employeesMentorId: EmployeeId | undefined) => string
  getDepartmentName: (employeesDeparimentId: DepartmentId) => string
  currentEmployee: Employee
  setCurrentEmployee: React.Dispatch<React.SetStateAction<Employee>>
  updateEmployee: (editedEmployee: Employee) => void
}

const EditForm: FC<Props> = props => {

  const classes = useStyles();

  const initialEditFormState = {
    firstName: props.currentEmployee.firstName, 
    lastName: props.currentEmployee.lastName, 
    department: `${props.currentEmployee.department}`, 
    position: props.currentEmployee.position, 
    mentorId: `${props.getMentorName(props.currentEmployee.mentorId)}`, 
    employmentDate: moment(props.currentEmployee.employmentDate).format('DD-MM-YYYY')
  }

  const [ editedEmployee, setEditedEmployee ] = useState(initialEditFormState)

  useEffect(
    () => { setEditedEmployee(initialEditFormState) },[props] 
  )

  const handleOnEditChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    console.log(name, value)
    setEditedEmployee({ ...editedEmployee, [name]: value })
  }

  const onUpdateClick = (event: MouseEvent<HTMLButtonElement>) => {
      let id = props.currentEmployee.id
      let firstName = editedEmployee.firstName
      let lastName = editedEmployee.lastName
      let department = parseInt(editedEmployee.department, 10)
      let position = editedEmployee.position
      let mentorId = parseInt(editedEmployee.mentorId, 10)
      let employmentDate = moment(editedEmployee.employmentDate, 'DD-MM-YYYY').toDate()
      
      let editedEmployeeTyped = {id, firstName, lastName, department, position, mentorId, employmentDate}
      event.preventDefault()

      // if(!id || !firstName || !lastName || !department || !position || !mentorId || !employmentDate) return
      props.updateEmployee(editedEmployeeTyped)

      // clear and hide update-form
      props.setCurrentEmployee(initialCurrentEmployee)
      props.setEditMode(false)
  }

  // Get mentor id and add it to a newEmployee
  const handleMentorId = (event: any, value: string) => {
    // if (value !== undefined){
      let mentorName = value.split(' ')[0]
      let mentor = props.employees.find(employee => {
        if(employee.firstName === mentorName){
          return employee
        }})
      let mentorIdString = mentor!.id.toString()
      setEditedEmployee({ ...editedEmployee, mentorId: mentorIdString })
    // } else {
    //   setEditedEmployee({...editedEmployee, mentorId: props.currentEmployee.mentorId.toString()})
    // }
  }
  
  const handleDepartment = (event: any, value: string) => {
    let department = props.departments.find(department => {
      if(department.name === value){
        return department
      }})
    let departmentString = department!.id.toString()
    setEditedEmployee({ ...editedEmployee, department: departmentString })
    }
  

  return (
    <TableRow key={props.currentEmployee.id}>
        <TableCell>
            {props.currentEmployee.id}
        </TableCell>
        <TableCell>
            <TextField  required
                        size='small'
                        name='firstName'
                        value={editedEmployee.firstName}
                        onChange={handleOnEditChange}>
            </TextField>
        </TableCell>
        <TableCell>
            <TextField  required
                        size='small'
                        name='lastName'
                        value={editedEmployee.lastName}
                        onChange={handleOnEditChange}>
            </TextField>
        </TableCell>
        <TableCell>
        <Autocomplete   options={props.departments}
                          getOptionLabel={(option) => (option.name)}
                          includeInputInList
                          onInputChange={handleDepartment}
                          renderInput={(params) => 
                              <TextField {...params}
                                          name='department'
                                          value={editedEmployee.mentorId}
                                          label="Department"
                                          variant="outlined" />
                          } />
        </TableCell>
        <TableCell>
            <TextField  required
                        size='small'
                        name='position'
                        value={editedEmployee.position}
                        onChange={handleOnEditChange}>
            </TextField>
        </TableCell>
        <TableCell>
        <Autocomplete   options={props.employees}
                          getOptionLabel={(option) => (option.firstName +' '+ option.lastName)}
                          includeInputInList
                          onInputChange={handleMentorId}
                          renderInput={(params) => 
                              <TextField {...params}
                                          name='mentorId'
                                          value={editedEmployee.mentorId}
                                          label="Mentor"
                                          variant="outlined" />
                          }/>
        </TableCell>
        <TableCell>
          <TextField  required
                      name='employmentDate'
                      value={editedEmployee.employmentDate}
                      onChange={handleOnEditChange}
                      label={'DD-MM-YYYY'}>
          </TextField>
        </TableCell>
        <TableCell align="right">
            <Button color='primary' 
                    variant='contained'
                    onClick={onUpdateClick}>
                    <DoneIcon />
            </Button>
            <Button className={classes.deleteButton} 
                    color='secondary' 
                    variant='outlined'
                    onClick={() => props.setEditMode(false)}>
                    <CloseIcon />
            </Button>
        </TableCell>
    </TableRow>
  )
} 

export default EditForm;
