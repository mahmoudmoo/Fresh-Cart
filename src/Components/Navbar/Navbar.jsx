import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../../finalProject assets/freshcart-logo.svg'
import { useContext } from 'react'
import { cartContext } from '../../Context/CartContextProvider'

export default function Navbar({ userData, setuserData }) {

  let { cartnumber, setcartnumber, setcartPrice } = useContext(cartContext)
  function logOut() {
    setuserData(null)
    setcartnumber(0)
    setcartPrice(0)
    localStorage.clear()
  }

  return <>
    <nav className="navbar navbar-expand-xl fixed-top navbar-light bg-light">
      <div className="container">
        
       
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="" />
        </Link>
       
        <button className="navbar-toggler d-xl-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          {userData !== null ? <ul className="navbar-nav me-auto mt-2 mt-lg-0 text-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item ">
              <Link className="nav-link" to="products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="categories">Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="brands">Brands</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="myOrders">My Orders</Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to={'Cart'}><button type="button" class="btn btn-sm  position-relative">
                <i className="fa-solid text-main  fa-cart-shopping"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartnumber}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </button></Link>
            </li>
          </ul>
            : null}

          <ul className="navbar-nav mt-2 mt-lg-0 text-center ms-auto">
            <li className="nav-item d-flex mx-auto align-items-center">
              <i className='fab fa-facebook mx-2'></i>
              <i className='fab fa-twitter mx-2'></i>
              <i className='fab fa-instagram mx-2'></i>
              <i className='fab fa-tiktok mx-2'></i>
              <i className='fab fa-linkedin mx-2'></i>
              <i className='fab fa-fa-youtube mx-2'></i>
            </li>
            {userData === null ? <>
              <li className="nav-item">
                <Link className="nav-link" to="signup">SignUp</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="login">LogIn</Link>
              </li>
            </>
              : <>
                <li className='nav-item '><span className="nav-link text-main">{userData.name}</span></li>
                <li className="nav-item">
                  <Link onClick={logOut} className="nav-link" to={'login'}>LogOut</Link>
                </li></>}

          </ul>
        </div>
      </div>
    </nav>


  </>
}
