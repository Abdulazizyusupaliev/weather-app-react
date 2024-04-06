import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
export default function Sidebar() {
    const [text, setText] = useState("<CODE/>")
    return (
        <div className='sidebar'>
            <div className='sidebar-logo'>
                <span className='sidebar-text-smart'>Smart</span>
                <span className='sidebar-text'>  {text}  </span>
            </div>
            <div className='sidebar-menu'>
                <li>
                    <NavLink to="/home" >
                        <div className='icon-content'>
                            <i className="bi bi-house-door"></i>
                        </div>
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/reception">
                        <div className='icon-content'>
                        <i className="bi bi-person-vcard"></i>
                        </div>
                        <span>Reception</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/course">
                        <div className='icon-content'>
                        <i className="bi bi-collection"></i>
                        </div>
                        <span>Course</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/teacher">
                        <div className='icon-content'>
                        <i className="bi bi-person-check"></i>
                        </div>
                        <span>Teacher</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/group">
                        <div className='icon-content'>
                        <i className="bi bi-people"></i>
                        </div>
                        <span>Group</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/news">
                        <div className='icon-content'>
                        <i className="bi bi-newspaper"></i>                        </div>
                        <span>News</span>
                    </NavLink>
                </li>
            </div>
        </div>
    )
}
