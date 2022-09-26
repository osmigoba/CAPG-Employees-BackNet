import React from 'react'
import './uAuthorized.scss';
import {  NavLink } from 'react-router-dom'
const unAuthorizedComponent = () => {
  return (
    <div className='unauthorized'>
      <h1>Unauthorized :(</h1>
      <span>
        <NavLink to='/'>Login to gain access</NavLink> 
      </span>
      <div>
      {/* <img src='https://media.istockphoto.com/vectors/red-rubber-stamp-icon-on-transparent-background-vector-id918643162?s=612x612' width="400px" height="300px"></img> */}
      </div>
      
    </div>
  )
}

export default unAuthorizedComponent