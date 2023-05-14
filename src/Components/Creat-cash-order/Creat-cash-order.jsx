import React, { useContext, useState } from 'react'
// import styles from './CreatCashOrder.module.css'
import { useFormik } from 'formik'

import * as Yup from "yup"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContextProvider'
export default function CreatCashOrder() {
  let { id } = useParams()
  let headers = { token: localStorage.getItem('token') }
const [loading,setloading]=useState(false)
let {setcartnumber}=useContext(cartContext)
  let navigate = useNavigate()
  async function hundelCash(values) {
    setloading(true)
    let { data } = await axios.post(`https://route-ecommerce-app.vercel.app/api/v1/orders/${id}`, { values }, { headers })
    console.log(data);
    if (data.status === "success") {
      navigate('/MyOrders')
      setloading(false)
      setcartnumber(0)
    }
  }


  let validationSchema = Yup.object({
    details: Yup.string().required('details is required'),
    phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/, 'phone must be egyption phone number'),
    city: Yup.string().required('city is required'),
  })

  let formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: ""
      }
    },
    onSubmit: hundelCash,
    validationSchema
  })


  return <>
<div className="container mt-5 pt-5">
    <form onSubmit={formik.handleSubmit} className="w-75 mx-auto my-5">



      <label htmlFor="details">details</label>
      <input type="text" id='details' name='details' className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} />
      {formik.errors.details && formik.touched.details ? <div className="alert alert-danger">{formik.errors.details}</div> : null}


      <label htmlFor="phone">Phone</label> 
      <input onBlur={formik.handleBlur} type="tel" name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} className='form-control mb-2' />
      {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger">{formik.errors.phone}</div>:null}
      
      <label htmlFor="city">city</label>
      <input type="text" id='city' name='city' className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} />
      {formik.errors.city && formik.touched.city ? <div className="alert alert-danger">{formik.errors.city}</div> : null}

      {loading ? <button type='button' className='btn bg-main w-100 text-white'  ><i className='fa fa-spinner fa-spin'></i></button> : <button type='submit' className='btn bg-main text-white' disabled={!(formik.dirty && formik.isValid)}>Submit</button>}




    </form>


    </div>
  </>
}
