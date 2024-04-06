import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Reception from '../pages/Reception'
import Course from '../pages/Course'
import Teacher from '../pages/Teacher'
import News from '../pages/News'
import Search from './Search'
export default function Content() {
  return (
    <div className='content'>
      <Search/>
      {
        <Outlet/>
      }
    </div>
  )
}
