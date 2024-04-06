import React from 'react'
import {  useLocation  } from 'react-router-dom';
const closeSearch=()=>{
    document.querySelector('.search').classList.remove("active")
}


export default function Search() {

  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className='search'> 
      <input type="text" placeholder='Search...' />
      <span onClick={closeSearch} className='search-close'><i className="bi bi-x-circle"></i></span>
    </div>
  )
}
