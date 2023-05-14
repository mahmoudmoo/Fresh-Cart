import React from 'react'
import styles from './NotFound.module.css'
import error404 from '../../imgs/error.svg'
export default function NotFound() {
  return <>
  <div className='container text-center mx-auto'>
    <img src={error404} className='w-75' alt="" />
  </div>
  </>
}
