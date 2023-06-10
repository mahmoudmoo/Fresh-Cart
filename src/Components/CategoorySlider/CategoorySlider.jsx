import React, { useEffect, useState } from 'react'
import styles from './CategoorySlider.module.css'
import Slider from 'react-slick';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCate } from '../../redux/slices/cateSlice';

export default function CategoorySlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };


  let { cateList, loading } = useSelector((state) => state.cateReducer)
  let disbatch = useDispatch()


  useEffect(() => {

   disbatch(getCate())




  }, [])



  return <>
{loading?<div className='col-11 text-center my-5 py-5'><i className='fa fa-spin  fa-circle-notch  fa-10x  text-main'></i></div>:
  <div className="col-11 mx-auto"><Slider {...settings}>
  {cateList.map((ele)=><div key={ele._id}>
    <Link to={'/productsByCategories/'+ele._id}>
    <div>
    <img src={ele.image} height={200}className='w-100'alt=''/>
    <h3 className='h6 text-center py-2 text-main'>{ele.name}</h3>
    </div>
    </Link>
  </div>)}
</Slider></div>
  }
  </>
}
