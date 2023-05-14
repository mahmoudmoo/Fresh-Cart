import React, { useEffect, useState } from 'react'
import styles from './CategoorySlider.module.css'
import Slider from 'react-slick';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
  const [cate, setcate] = useState([])
  const [isLoading, setisLoading] = useState(false)

  async function getCate() {
    setisLoading(true)
    let { data } = await axios('https://route-ecommerce-app.vercel.app/api/v1/categories')
    setcate(data.data)
    setisLoading(false)
  }

  useEffect(() => {

    getCate()

  }, [])



  return <>
{isLoading?<div className='col-11 text-center my-5 py-5'><i className='fa fa-spin  fa-circle-notch  fa-10x  text-main'></i></div>:
  <div className="col-11 mx-auto"><Slider {...settings}>
  {cate.map((ele)=><div key={ele._id}>
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
