import React, { FC } from 'react'
// import {Field, reduxForm } from 'redux-form'
// import TextField from '@material-ui/core/TextField'

// // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// // const asyncValidate: Function = (values /*, dispatch */) => {
// //   return sleep(1000).then(() => {
// //     // simulate server latency
// //     if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
// //       // eslint-disable-next-line no-throw-literal
// //       throw { email: 'Email already Exists' }
// //     }
// //   })
// // }

// // const validate = values => {
// //   const errors = {}
// //   const requiredFields = [
// //     'firstName',
// //     'lastName',
// //     'department',
// //     'position',
// //     'employmentDate',
// //   ]
// //   requiredFields.forEach(field => {
// //     if (!values[field]) {
// //       errors[field] = 'Required'
// //     }
// //   })
// //   return errors
// // }

// const renderTextField: <any> = ({input, label, meta: { touched, error }, ...custom}) => (
//   <TextField
//     required
//     hintText={label}
//     floatingLabelText={label}
//     errorText={touched && error}
//     {...input}
//     {...custom}
//   />
// )

// type FormPropsType = {
//     handleSubmit: () => void
//     pristine: boolean
//     reset: () => void
//     submitting: boolean
// }

// export const EditForm = ({ handleSubmit, pristine, reset, submitting }) => {

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <Field name="firstName" component={renderTextField} label="First Name"/>
//       </div>
//       <div>
//         <Field name="lastName" component={renderTextField} label="Last Name" />
//       </div>
//       <div>
//         <Field name="departmentId" component={renderTextField} label="Department ID" />
//       </div>
//       <div>
//         <Field name="position" component={renderTextField} label="Posiiton" />
//       </div>
//       <div>
//         <Field name="mentorId" component={renderTextField} label="Mentor ID" />
//       </div>
//       {/* <div>
//         <Field name='employmentDate' component={renderDatePickerComponent} label='Employment Date' />
//       </div> */}

//       <div>
//         <button type="submit" disabled={pristine || submitting}>
//           Submit
//         </button>
//         <button type="button" disabled={pristine || submitting} onClick={reset}> {/* clear, go back */}
//           Cancel
//         </button>
//       </div>
//     </form>
//   )
// }

// export default reduxForm({
//   form: 'EditForm', // a unique identifier for this form
// //   validate,
// //   asyncValidate
// })(EditForm)