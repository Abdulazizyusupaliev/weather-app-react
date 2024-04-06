import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Login from './pages/Login'
import Home from './pages/Home'
import Reception from './pages/Reception'
import Course from './pages/Course'
import Teacher from './pages/Teacher'
import News from './pages/News'
import Group from './pages/Group'
import AddStudent from './pages/AddStudent'
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/reception' element={<Reception />} />
          <Route path='/course' element={<Course />} />
          <Route path='/teacher' element={<Teacher />} />
          <Route path='/group' element={<Group />} />
          <Route path='/news' element={<News />} />
          <Route path='/group/:id/:course_id' element={<AddStudent />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}
