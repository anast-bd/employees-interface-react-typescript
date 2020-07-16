import React, {FC, useState, MouseEvent} from 'react'
import { EmployeeId, DepartmentId, Props } from '../types/types'
import {Table, TableBody, TableCell, TableHead, TableRow, Typography, Container, Button, Paper, TextField, Input } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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
        paddingTop: '10px',
        paddingBottom: '5px',
        paddingLeft: '15px',
    },
    listContainer: {
        position: 'relative',
        top: '20px'
    }
  }));


const EmployeesList: FC<Props> = (props) => {

    const classes = useStyles();

    // Edit mode state & 'Edit' button click hangling
    type editMode = Boolean;
    let [editMode, setEditMode] = useState(false);
    const toggleEditMode = () : void => {
        editMode? setEditMode(false) : setEditMode(true)
    }
    let isEditMode = editMode;
    const onEditClick = (e: MouseEvent) :void =>{
        props.onEmployeeClick(e);
        toggleEditMode();
    }

    // Showed data format converting
    // const getDepartmentName = (employeesDeparimentId: DepartmentId) : string => {
    //     let employeesDepartment = props.departments!.find( department => employeesDeparimentId === department.id)
    //     return employeesDepartment!.name
    // }
    // const getMentorName = (employeesMentorId: EmployeeId | undefined) : string => {
    //     if (employeesMentorId !== undefined) {
    //         let employeesMentor = props.employees!.find( employee => employeesMentorId === employee.id)
    //         return ( employeesMentor!.firstName + ' ' + employeesMentor!.lastName )
    //     } else {
    //         return '-'
    //     }
    // }
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

    // TextField handle input change
    


    return (
        <Container className={classes.listContainer}>
        <Paper>
        <Typography className={classes.listTitle} component="h2" variant="h6" color="primary" gutterBottom>
            Employees
        </Typography>
        <Table size="small">
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
                        <Button color='primary' variant='outlined'> Add</Button>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {props.employees!.map((employee) => {
                if ((employee.id === props.currentEmployeeId) && isEditMode){
                    return (
                        <TableRow key={employee.id}>
                            <TableCell>
                                {employee.id}
                            </TableCell>
                            <TableCell>
                                <TextField value={employee.firstName}></TextField>
                            </TableCell>
                            <TableCell>
                                <TextField value={employee.lastName}></TextField>
                            </TableCell>
                            {/* <TableCell><TextField>{getDepartmentName(employee.department)}</TextField></TableCell> */}
                            <TableCell><TextField value={employee.department}></TextField></TableCell>
                            <TableCell><TextField value={employee.position}></TextField></TableCell>
                            {/* <TableCell><TextField>{getMentorName(employee.mentorId)}</TextField></TableCell> */}
                            <TableCell><TextField value={employee.mentorId}>{employee.mentorId}</TextField></TableCell>
                            <TableCell><TextField>{formatDate(employee.employmentDate)}</TextField></TableCell>
                            <TableCell align="right">
                                <Button color='primary' 
                                        variant='contained'
                                        data-id={employee.id}
                                        onClick={onEditClick}>
                                        Save
                                </Button>
                                <Button className={classes.deleteButton} color='secondary' variant='outlined'>Cancel</Button>
                            </TableCell>
                        </TableRow>
                    )
                } else {
                    return (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.id}</TableCell>
                            <TableCell>{employee.firstName}</TableCell>
                            <TableCell>{employee.lastName}</TableCell>
                            {/* <TableCell>{getDepartmentName(employee.department)}</TableCell> */}
                            <TableCell>{employee.department}</TableCell>
                            <TableCell>{employee.position}</TableCell>
                            {/* <TableCell>{getMentorName(employee.mentorId)}</TableCell> */}
                            <TableCell>{employee.mentorId}</TableCell>
                            <TableCell>{formatDate(employee.employmentDate)}</TableCell>
                            <TableCell align="right">
                                {!isEditMode && 
                                    <>
                                        <Button color='primary' 
                                            variant='contained'
                                            data-id={employee.id}
                                            onClick={onEditClick}>
                                            <EditIcon />
                                        </Button>
                                        <Button className={classes.deleteButton} 
                                            color='secondary' 
                                            variant='outlined'> 
                                            <DeleteIcon />
                                        </Button>
                                    </>
                                }

                            </TableCell>
                        </TableRow>
                    )
                }
            
            })}
            </TableBody>
            </Table>
        </Paper>
        </Container>
    )
}

export default EmployeesList;