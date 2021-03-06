export type DepartmentId = number
export type EmployeeId = number
export interface Department {
  id: DepartmentId
  name: string
}
export interface Employee {
  id: EmployeeId
  firstName: string
  lastName: string
  position: string
  employmentDate: Date
  mentorId?: EmployeeId
  department: DepartmentId
}

export type InitialStateType = {
  employees: Employee[],
  departments: Department[],
}