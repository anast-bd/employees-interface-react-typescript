import React, {FC} from 'react'
import { connect } from 'react-redux'
import { Department, EmployeeId, Employee } from '../types/types'
import { setCurrentEmployee, AppStateType } from '../redux/appReducer'
import { Typography } from '@material-ui/core'
import { Container } from '@material-ui/core'
// import {Field, reduxForm } from 'redux-form'
// import TextField from '@material-ui/core/TextField'

type MapDispatchToPropsType = {
	// setCurrentEmployee: (newId : number) => void;
}

type MapStateToPropsType = {
	employees: Employee[] | null
	departments: Department[] | null
	currentEmployeeId: EmployeeId | undefined |null
}
type DefaultRootState = {

}

type PropsType = MapDispatchToPropsType & MapStateToPropsType & DefaultRootState

let EditFormContainer: FC<PropsType> = (props) => {
    return(
        <Container>
            <Typography>Edit Employee Profile</Typography>
            <div>{props.currentEmployeeId}</div> 
        </Container>
    )
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        employees: state.employees,
        departments: state.departments,
        currentEmployeeId: state.currentEmployeeId
    }
}

export default connect <MapStateToPropsType, MapDispatchToPropsType, DefaultRootState, AppStateType> 
            (mapStateToProps) (EditFormContainer);



