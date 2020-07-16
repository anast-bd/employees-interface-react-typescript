import React, {FC} from 'react';
// import { InitialStateType } from '../redux/appReducer';
import { EmployeeId, DepartmentId, Props } from '../types/types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
    },
    deleteButton: {
        marginLeft: '5px'
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

    const getDepartmentName = (employeesDeparimentId: DepartmentId) : string => {
        let employeesDepartment = props.departments!.find( department => employeesDeparimentId === department.id)
        return employeesDepartment!.name
    }
    
    const getMentorName = (employeesMentorId: EmployeeId | undefined) : string => {
        if (employeesMentorId !== undefined) {
            let employeesMentor = props.employees!.find( employee => employeesMentorId === employee.id)
            return ( employeesMentor!.firstName + ' ' + employeesMentor!.lastName )
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

    const classes = useStyles();

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
                    <TableCell align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {props.employees!.map((employee) => (
                <TableRow key={employee.id}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell>{employee.firstName}</TableCell>
                    <TableCell>{employee.lastName}</TableCell>
                    <TableCell>{getDepartmentName(employee.department)}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{getMentorName(employee.mentorId)}</TableCell>
                    <TableCell>{formatDate(employee.employmentDate)}</TableCell>
                    <TableCell align="right">
                        <Button color='primary' 
                                variant='contained'
                                data-id={employee.id}
                                onClick={props.onEmployeeClick}
                                href='/edit'>
                                Edit
                        </Button>
                        <Button className={classes.deleteButton} color='secondary' variant='outlined'>Delete</Button>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
            </Table>
        </Paper>
        </Container>
    )
}

export default EmployeesList;