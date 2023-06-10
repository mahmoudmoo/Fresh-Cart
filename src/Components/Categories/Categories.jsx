import React, { useEffect, useState } from 'react'
import styles from './Categories.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getCate } from '../../redux/slices/cateSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Categories() {
  let { cateList, loading } = useSelector((state) => state.cateReducer)
  let disbatch = useDispatch()


  useEffect(() => {

   disbatch(getCate())

  }, [])

return <>
<div className="row g-4 container mx-auto">
<h2 className=' text-main mt-5 pt-5 text-center'>Categoory</h2>
{loading?<div className='col-12 text-center my-5 py-5'><i className='fa fa-spin  fa-circle-notch  fa-10x  text-main'></i></div>:cateList.map((ele)=><div className='col-md-4' key={ele._id}>
  <Link to={'/productsByCategories/'+ele._id}><div className='rounded-circle overflow-hidden'>
      <img src={ele.image} height={350}className='w-100'alt=''/>
      <h3 className='h6 text-center py-2 text-main'>{ele.name}</h3>
      </div>
      </Link>
    </div>)}</div>
  </>
}
