import React, {FC} from 'react';
import {connect} from 'react-redux';
import { Department, EmployeeId, Employee } from '../types/types';
import { setCurrentEmployee, AppStateType } from '../redux/appReducer'
import EmployeesList from './EmployeesList';

type MapDispatchToPropsType = {
	setCurrentEmployee: (newId : number) => void;
}

type MapStateToPropsType = {
	employees: Employee[] | null
	departments: Department[] | null
	currentEmployeeId: EmployeeId | undefined |null
}
type DefaultRootState = {

}

type PropsType = MapDispatchToPropsType & MapStateToPropsType & DefaultRootState

let EmployeesListContainer: FC<PropsType> = (props) => {

	let onEmployeeClick = (e: any) => {
		let newId = e.currentTarget.getAttribute('data-id'); // get new Current employee id
		newId = parseInt(newId , 10)
		props.setCurrentEmployee(newId);
	}

	return ( 
		<EmployeesList  employees={props.employees}
						departments={props.departments}
						currentEmployeeId={props.currentEmployeeId}
						onEmployeeClick={onEmployeeClick}
		/>
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
				(mapStateToProps, {setCurrentEmployee}) (EmployeesListContainer);