import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'
import Navbar from '../components/Navbar'
export default function Layout() {
  const [active,setActive] = useState(false);



  return (
    <div className='wrapper'>
     <Sidebar/>
     <Main/>
     <Navbar title={active?"navbar-active":""} closeNavbar={setActive} />
      <div className='toggle' onClick={()=>setActive(true)}>
        <span className='toggle-icon'><i className="bi bi-gear"></i></span>
      </div>
    </div>
  )
}
