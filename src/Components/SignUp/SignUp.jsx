import { useFormik } from 'formik'
import React, { useState } from 'react'
import styles from './SignUp.module.css'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



export default function SignUp() {
  const [loading,setloading]=useState(false)
  const [msgerr,setmsgerr]=useState('')

  let navigate=useNavigate()

  
  async function handelSignUp(values) {
  setloading(true)
    let {data}=await axios.post('https://route-ecommerce-app.vercel.app/api/v1/auth/signup',values).catch((err)=>{
      setmsgerr(`${err.response.data.message}`)
      setloading(false)
    })
    
  if (data.message==="success"){
      navigate('/login')
      setloading(false)
    }
  }
  let validationSchema =Yup.object({
    name:Yup.string().required('name is required').min(3,'min is 3').max(10,'max is 10'),
    email:Yup.string().required('email is required').email('email is invalid'),
    password:Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,'Minimum eight characters, at least one letter and one number'),
    rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password')],'password and repassword doesnot match'),
    phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,'phone must be egyption phone number'),
  })

//   function validate(values) {
//     let errors={}
//     if(!values.name)
//     {
//       errors.name="name is required"
//     }else if(values.name.length<3){
//       errors.name="name min lenght is 3"
//     }else if(values.name.length>10){
//       errors.name="name max lenght is 10"
//     }


//   if(!values.email){
//     errors.email="email is required"
//   }else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)){
//     errors.email="email is not valid"
//   }


//   if(!values.password){
//     errors.password="password is required"
//   }else if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)){
//     errors.password="Minimum eight characters, at least one letter and one number"
//   }


//   if(!values.rePassword){
//     errors.rePassword="rePassword is required"
//   }else if(values.rePassword!==values.password){
//     errors.rePassword="password and repassword doesnot match"
//   }


//   if(!values.phone){
//     errors.phone="phone is required"
//   }else if(!/^01[0125][0-9]{8}$/.test(values.phone)){
//     errors.phone="phone must be egyption phone number"
//   }

// return errors
// }

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: handelSignUp
  })

  return <>
<div className="container stretshHeight">

    <form onSubmit={formik.handleSubmit} className='w-75 mx-auto'>

      {msgerr!==''?<div className="alert alert-danger">{msgerr}</div>:null}


      <label htmlFor="name">Name</label>
      <input onBlur={formik.handleBlur} type="text" name='name' id='name' value={formik.values.name} onChange={formik.handleChange} className='form-control mb-2' />
      {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div>:null}


      <label htmlFor="email">Email</label>
      <input onBlur={formik.handleBlur} type="email" name='email' id='email' value={formik.values.email} onChange={formik.handleChange} className='form-control mb-2' />
      {formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:null}
      
      
      <label htmlFor="password">password</label>
      <input onBlur={formik.handleBlur} type="password" name='password' id='password' value={formik.values.password} onChange={formik.handleChange} className='form-control mb-2' />
      {formik.errors.password && formik.touched.password?<div className="alert alert-danger">{formik.errors.password}</div>:null}
      
      
      <label htmlFor="rePassword">RePassword</label>
      <input onBlur={formik.handleBlur} type="password" name='rePassword' id='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} className='form-control mb-2' />
      {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger">{formik.errors.rePassword}</div>:null}
      
      <label htmlFor="phone">Phone</label> 
      <input onBlur={formik.handleBlur} type="tel" name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} className='form-control mb-2' />
      {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger">{formik.errors.phone}</div>:null}
      
      {loading?<button  tybe='button'className='btn bg-main text-white w-100 mt-3'><i className='fa fa-spinner fa-spin'></i></button>:<button disabled={!(formik.isValid && formik.dirty)} tybe='submit'className='btn bg-main text-white w-100 mt-3'>sign up</button>}
      
      

    </form>


</div>
  </>
}
