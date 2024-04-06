import React, { useEffect, useState } from 'react'

export default function Navbar(props) {
  const [theme, setTheme] = useState(localStorage.getItem("theme")?true:false)
  let body = document.querySelector('body');
  useEffect(()=>{
    if(theme){
      body.classList.add("theme")
    }
  },[])
  const changeTheme = () => {
    body.classList.toggle("theme")
    setTheme(!theme);
    if(!theme){
      localStorage.setItem("theme",1)
      return;
    }
    localStorage.removeItem("theme")
  }

  const showSearch=()=>{
    document.querySelector(".search").classList.add("active")
  }
  return (
    <div className={props.title + " navbar"}>
      <div className='overly'></div>
      <div className='close-navbar' onClick={() => props.closeNavbar(false)}>
        <i className="bi bi-chevron-right"></i>
      </div>
      <ul className='navbar-menu'>
        <li>
          <span className='navbar-menu-icon' onClick={changeTheme}>
            {
              !theme ? <i className="bi bi-brightness-high"></i> : <i className="bi bi-moon-fill"></i>
            }
          </span>
        </li>
        <li>
          <span onClick={showSearch} className='navbar-menu-icon'>
            <i className="bi bi-search"></i>
          </span>
        </li>


      </ul>
    </div>
  )
}
