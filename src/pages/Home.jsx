import React, { useEffect, useState } from 'react'
import '../../src/css/home.css'
import 'react-calendar/dist/Calendar.css';
import Frontend__img from '../img/images.jpg'
import Backend__img from '../img/hero.png'
import axios from 'axios'
import Calendar from 'react-calendar';


export default function Home() {
  const [value, onChange] = useState(new Date())
  let name = ''
  const [totalStudents, setTotalStudents] = useState(0)
  const [totalCourses, setTotalCourses] = useState(0)
  const [allTeacher, setAllTeacher] = useState(0)
  const date = new Date();
  const showTime = date.getHours().toString().padStart(2,0) 
        + ':' + date.getMinutes().toString().padStart(2,0);
  useEffect(() => {
    axios.get('https://65af84f32f26c3f2139b0190.mockapi.io/reception')
      .then(res => setTotalStudents(res.data.length))
      .catch(err => console.log(err))

    axios.get('https://65af84f32f26c3f2139b0190.mockapi.io/courses')
      .then(res => setTotalCourses(res.data.length))
      .catch(err => console.log(err))


    axios.get('https://65af84f32f26c3f2139b0190.mockapi.io/teacher')
      .then(res => setAllTeacher(res.data.length))
      .catch(err => console.log(err))
  }, [])
  return (
    <>
      <div className="top__bar">
        <div className="left">
          <h1 className="title">Hello {name}!</h1>
          <p className="text">hope you have a good day</p>
        </div>
        <div className="right">
          <p className="time">{showTime} Uzbekistan, Tashkent</p>
        </div>
      </div>

      <div className="home__content">
        <div className="statistics">
          <div className="statistics__1">
            <div className="card">
              <div className="card__icon__text">
                <i className="bi bi-people"></i>
                <p className='total__students'>Total Students</p>
              </div>
              <p className="total__students-number">{totalStudents}</p>
            </div>
            <div className="card">
              <div className="card__icon__text">
                <i className="bi bi-people"></i>
                <p className='total__students'>Total Students</p>
              </div>
              <p className="total__students-number">{totalCourses}</p>
            </div>
            <div className="card">
              <div className="card__icon__text">
                <i className="bi bi-people"></i>
                <p className='total__students'>All Teachers</p>
              </div>
              <p className="total__students-number">{allTeacher}</p>
            </div>
          </div>
          <div className="statistics_2">
            {/* <img src={Frontend__img} alt="img" /> */}
            <img src={Backend__img} alt="img" />
          </div>
        </div>
        <div className="content__intro">
          <div className="date">

          </div>
          <div className="teachers">
          <Calendar onChange={onChange} value={value} />
          </div>
        </div>
      </div>
    </>
  )
}
