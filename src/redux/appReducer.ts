import { Employee, EmployeeId, Department } from '../types/types';

const SET_CURRENT_EMPLOYEE = 'SET_CURRENT_EMPLOYEE';

export type InitialStateType = {
    employees: Employee[],
	departments: Department[],
	currentEmployeeId: EmployeeId
}

let initialState : InitialStateType = {
	employees: [
		{ 	
			id: 0,
			firstName: 'Jack',
			lastName: 'Burner',
			position: 'senior burner',
			employmentDate: new Date('2014-08-18'),
			department: 0
		},
		{ 	
			id: 1,
			firstName: 'Megan',
			lastName: 'Waterman',
			position: 'fire extinguisher',
			employmentDate: new Date('2014-10-05'),
			mentorId: 0,
			department: 1
		},
		{ 	
			id: 2,
			firstName: 'Lily',
			lastName: 'Brenner',
			position: 'junior burner',
			employmentDate: new Date('2016-03-03'),
			mentorId: 0,
			department: 0
		},
    ],
    departments: [
        {id: 0, name: 'The First Department'},
        {id: 1, name: 'The Coolest Department'}
	],
	currentEmployeeId: 0
}

export const rootReducer = (state = initialState, action: setCurrentEmployeeActionType) => {
    switch(action.type){
        case 'SET_CURRENT_EMPLOYEE': {
            return {
				...state, 
				currentEmployeeId: action.currentEmployeeId
			}
        }
    default:
        return state
    }
}


type setCurrentEmployeeActionType = {type: typeof SET_CURRENT_EMPLOYEE, currentEmployeeId: EmployeeId}

export const setCurrentEmployee = (currentEmployeeId: EmployeeId):setCurrentEmployeeActionType => ({
    type: SET_CURRENT_EMPLOYEE,
    currentEmployeeId
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;