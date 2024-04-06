import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'


export default function Course() {

  const [course, setCourse] = useState([])
  const [dep, setDep] = useState(false)
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(null)

  const name = useRef();
  const price = useRef();
  const duration = useRef();
  const description = useRef();
  const img = useRef();

  useEffect(() => {
    axios.get("https://65af84f32f26c3f2139b0190.mockapi.io/courses")
      .then(res => setCourse(res.data))
      .catch(error => console.log(error))
  }, [dep])


  const removeCourse = (id) => {
    axios.delete(`https://65af84f32f26c3f2139b0190.mockapi.io/courses/${id}`)
      .then(() => setDep(!dep))
      .catch(error => console.log(error))
  }

  const saveNewCourse = (e) => {
    e.preventDefault()
    let newCourse = {
      "name": name.current.value,
      "duration": duration.current.value,
      "description": description.current.value,
      "img": img.current.value,
      "price": price.current.value,
    }
    if (!id) {
      axios.post("https://65af84f32f26c3f2139b0190.mockapi.io/courses", newCourse, {
        headers: {
          "Content-Type": 'application/json'
        }
      })
        .then(() => {
          setDep(!dep);
          setOpen(false);
          e.target.reset()
        })
        .catch((error) => console.log(error))
      return;
    }

    axios.put(`https://65af84f32f26c3f2139b0190.mockapi.io/courses/${id}`, newCourse, {
      headers: {
        "Content-Type": 'application/json'
      }
    })
      .then(() => {
        setDep(!dep);
        setOpen(false)
        setId(null);
        e.target.reset()

      })
      .catch((error) => console.log(error))
  }

  const getCourse = (id) => {
      axios.get(`https://65af84f32f26c3f2139b0190.mockapi.io/courses/${id}`)
        .then(res => {
          let data = res.data;
          setOpen(true);
          setId(data.id)
          name.current.value = data.name
          price.current.value = data.price
          duration.current.value = data.duration
          img.current.value = data.img
          description.current.value = data.description
        })


      
  }

  const log = console

  console.log(log.textarea);
  return (
    <>
      <div className='News'>
        <h1 className='News-title'>Course</h1>
        <button className='Add' onClick={() => setOpen(true)}>Add</button>
      </div>   <div className='cours_boss'>

        {
          course.map(item => <div key={item.id} className='cours'>
            <div className='cours_container1'>
              <div className='cours_row1'>
                <div className='cours_row4'>
                  <div className='cours_img'>
                    <img className='cours_img1' src={item.img} alt="" />
                  </div>
                  <div className='course-actions'>
                    <i className="bi bi-three-dots-vertical"></i>
                    <ul className='course-action-menu'>
                      <li ><i className="bi bi-pen" onClick={() => getCourse(item.id)}></i></li>
                      <li><i className="bi bi-trash3" onClick={() => removeCourse(item.id)}></i></li>
                    </ul>
                  </div>
                </div>
                <p className='cours_p1'>{item.name}</p>


                <div className='cours_row2'>
                  <p className='cours_p2'>Duration:</p>
                  <p className='cours_p3'>{item.duration} months</p>
                </div>
                <div className='cours_row3'>
                  <p className='cours_p2'>Price:</p>
                  <p className='cours_p5'>{item.price}UZS</p>
                </div>
                <div className='cours_line'></div>
                <p className='cours_p6'>{item.description}</p>
              </div>
            </div>
          </div>)
        }
      </div>


      {/* popup */}
      <div className={open ? "modal-container modal-active" : "modal-container"} onClick={() => setOpen(false)}>
        <div className='modal' onClick={(e) => e.stopPropagation()}>
          <h1 className='modal-title'>Create course</h1>
          <form className='form' onSubmit={saveNewCourse}>
            <input required ref={name} type="text" placeholder='Enter course name' />
            <input required ref={duration} type="number" placeholder='Enter course duration' />
            <input required ref={img} type="text" placeholder='Enter course img' />
            <input required ref={price} type="number" placeholder='Enter course price' />
            <textarea ref={description} name="" id="" cols="30" rows="10" placeholder='Enter description'></textarea>
            <button type='submit' className='add-new-course'>{id ? "Update" : "Save"}</button>
          </form>
        </div>
      </div>
      {/* popup */}




    </>

  )
}
