import React, { useState } from 'react'
import styles from './LogIn.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function LogIn({getToken}) {
let navigate=useNavigate()
const [loading,setloading]=useState(false)
const [msgerr,setmsgerr]=useState('')

async  function hundelLogin(values){
 setloading(true)
  let{data}=await axios.post('https://route-ecommerce-app.vercel.app/api/v1/auth/signin',values).catch((err)=>{
    setmsgerr(`${err.response.data.message}`)
    setloading(false)
  })
  
  if(data.message ==='success'){
    localStorage.setItem('token',data.token)
    getToken()
    navigate('/')
    setloading(false)
  }
  


}
let validationSchema=Yup.object({
  email:Yup.string().required('email is required').email('email is invalid'),
  password:Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,'Minimum eight characters, at least one letter and one number'),
})

let formik=useFormik({
  initialValues:{
    email:'',
    password:'',
  },
  onSubmit:hundelLogin,
  validationSchema
})  
  
  return <>
<div className="container  stretshHeight">

  <form onSubmit={formik.handleSubmit} className="w-75 mx-auto my-5">

  {msgerr!==''?<div className="alert alert-danger">{msgerr}</div>:null}
    
    <label htmlFor="email">Email</label>
    <input type="email" id='email' name='email'className='form-control'onChange={formik.handleChange}onBlur={formik.handleBlur} />
    {formik.errors.email&&formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:null}
    
    
    <label htmlFor="password">Password</label>
    <input type="password" id='password' name='password'className='form-control'onChange={formik.handleChange}onBlur={formik.handleBlur} />
    {formik.errors.password&&formik.touched.password?<div className="alert alert-danger">{formik.errors.password}</div>:null}
    
    {loading?<button type='button' className='btn bg-main text-white w-100 mt-3'  ><i className='fa fa-spinner fa-spin'></i></button>:<button type='submit' className='btn bg-main text-white w-100 mt-3'disabled={!(formik.dirty&&formik.isValid)}>Login</button>}
    
    
    
    
    </form>  

</div>
  </>
}
