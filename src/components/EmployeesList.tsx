import React, {useState} from 'react'
import { EmployeeId, DepartmentId, Employee, InitialStateType } from '../types/types'
import {Table, TableBody, TableCell, TableHead, TableRow, Typography, Container, Button, Paper, Tooltip, IconButton} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import EditForm from './EditForm'
import AddForm from './AddForm'
import Moment from 'react-moment'

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
    },
    deleteButton: {
        marginLeft: '5px',
        pudding: '0px'
    },
    listTitle: {
        paddingTop: '20px',
        paddingBottom: '5px',
        paddingLeft: '25px',
        fontSize: '1.7rem'
    },
    listContainer: {
        position: 'relative',
        top: '20px',
    }
  }));

export const initialCurrentEmployee = {} as Employee

const EmployeesList = () => {

    const classes = useStyles();

    let initialState : InitialStateType = {
        employees: [
            { 	
                id: 486,
                firstName: 'Judy',
                lastName: 'Karter',
                position: 'development leader',
                employmentDate: new Date('2012-08-18'),
                department: 0
            },
            { 	
                id: 332,
                firstName: 'Dilan',
                lastName: 'Moran',
                position: 'project coordinator',
                employmentDate: new Date('2014-10-05'),
                mentorId: 486,
                department: 1
            },
            { 	
                id: 961,
                firstName: 'Douglas',
                lastName: 'Stanhope',
                position: 'data engineer',
                employmentDate: new Date('2014-03-03'),
                mentorId: 486,
                department: 2
            },
            { 	
                id: 173,
                firstName: 'Bo',
                lastName: 'Burnham',
                position: 'front-end developer',
                employmentDate: new Date('2018-03-07'),
                mentorId: 332,
                department: 1
            }
        ],
        departments: [
                {id: 0, name: 'The First Department'},
                {id: 1, name: 'The Coolest Department'},
                {id: 2, name: 'The Chiliest Department'},
        ]
    }

    const [employees, setEmployees] = useState(initialState.employees)
    const [departments, setDepartments] = useState(initialState.departments)

    // Edit mode state & 'Edit' button click hangling
    type editMode = Boolean
    const [editMode, setEditMode] = useState(false);

    // Add mode state 
    type addMode = Boolean;
    let [addMode, setAddMode] = useState(false)

    const toggleAddMode = () => {
        setAddMode(!addMode)
    }

    // Showed data format converting
    const getDepartmentName = (employeesDeparimentId: DepartmentId) : string => {
        let employeesDepartment = initialState.departments.find( department => employeesDeparimentId === department.id)
        return employeesDepartment!.name
    }
    const getMentorName = (employeesMentorId: EmployeeId | undefined) : string => {
        if (employeesMentorId !== undefined) {
            let employeesMentor = initialState.employees.find( employee => employeesMentorId === employee.id)
            if (employeesMentor !== undefined) {
                return (`${employeesMentor!.firstName} ${employeesMentor!.lastName}`)
                } else {
                    return '-'
                }
        } else {
            return '-'
        }
    }
    function formatDate(date: Date) : string {
            let month = (date.getMonth() + 1).toString();
            let day = date.getDate().toString();
            let year = date.getFullYear().toString();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('.');
    }
    
    
    const addEmployee = (employee: Employee) => {
        setEmployees([...employees, employee])
    }

    const deleteEmployee = (id: EmployeeId) => {
        setEditMode(false)
        setEmployees(employees.filter((employee: Employee) => employee.id !== id))
      }

    const onDeleteClick = (id: EmployeeId) => {    
        let answer = window.confirm('Are you sure you want to delete this employee?')
        if (answer) {
            deleteEmployee(id)
        }
    }

    // Employee to edit state
    const [currentEmployee, setCurrentEmployee] = useState(initialCurrentEmployee)

    // Set employee to edit
    const onEditClick = (employee: Employee) =>{
        setCurrentEmployee({id: employee.id,
                            firstName: employee.firstName, 
                            lastName: employee.lastName, 
                            department: employee.department, 
                            position: employee.position, 
                            mentorId: employee.mentorId, 
                            employmentDate: employee.employmentDate})
        setEditMode(true)
    }

    const updateEmployee = (editedEmployee: Employee) => {

        setEmployees(employees.map(employee => (employee.id === editedEmployee.id)? editedEmployee : employee))
    }

    return (
        <Container className={classes.listContainer}>
        <Paper>
        <Typography className={classes.listTitle} component="h2" variant="h4" color="primary" gutterBottom>
            Employees
        </Typography>
        <Table >
            <colgroup>
                <col style={{width: '4%'}}/>
                <col style={{width: '11%'}}/>
                <col style={{width: '11%'}}/>
                <col style={{width: '15%'}}/>
                <col style={{width: '15%'}}/>
                <col style={{width: '15%'}}/>
                <col style={{width: '14%'}}/>
                <col style={{width: '15%'}}/>
            </colgroup>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>Mentor</TableCell>
                    <TableCell>Employment Date</TableCell>
                    <TableCell align="right">
                        <Button color='primary' 
                                variant='outlined' 
                                onClick={toggleAddMode}> 
                                Add
                        </Button>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            { addMode &&
                <AddForm addEmployee={addEmployee}
                         setAddMode={setAddMode} 
                         employees={employees}
                         departments={departments}
                         getDepartmentName={getDepartmentName}
                         getMentorName={getMentorName}
                         />
            }
            {employees.length > 0 ? (
                employees!.map((employee) => {
                    if ((employee.id === currentEmployee.id) && editMode){
                return ( 
                    <EditForm   setEditMode={setEditMode}
                                employees={employees}
                                departments={departments}
                                currentEmployee={currentEmployee}
                                setCurrentEmployee={setCurrentEmployee}
                                updateEmployee={updateEmployee} 
                                getDepartmentName={getDepartmentName}
                                getMentorName={getMentorName}/>
                )
            } else {
                return (
                    <TableRow key={employee.id}>
                        <TableCell>{employee.id}</TableCell>
                        <TableCell>{employee.firstName}</TableCell>
                        <TableCell>{employee.lastName}</TableCell>
                        <TableCell>{getDepartmentName(employee.department)}</TableCell>
                        {/* <TableCell>{employee.department}</TableCell> */}
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{getMentorName(employee.mentorId)}</TableCell>
                        {/* <TableCell>{employee.mentorId}</TableCell> */}
                        <TableCell>
                            <Moment format="DD-MM-YYYY">
                                {employee.employmentDate.toDateString()}
                            </Moment>
                            {/* {formatDate(employee.employmentDate)} */}
                        </TableCell>

                        <TableCell align="right">
                            {!editMode && 
                                <>
                                    <Button color='primary' 
                                            variant='contained'
                                            onClick={() => onEditClick(employee)}>
                                            <EditIcon />
                                    </Button>
                                    <Button className={classes.deleteButton} 
                                            color='secondary' 
                                            variant='outlined'
                                            onClick={() => onDeleteClick(employee.id)}>
                                            <DeleteIcon />
                                    </Button>
                                </>
                            }
                        </TableCell>
                    </TableRow>
                )
             } 
            })) : (
                <TableRow>
                    <TableCell align="center" colSpan={8}>No Employees</TableCell>
                </TableRow>
              )}
            </TableBody>
            </Table>
        </Paper>
        </Container>
    )
}

export default EmployeesList