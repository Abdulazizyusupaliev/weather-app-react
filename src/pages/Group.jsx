import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Group() {

  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [course, setCourse] = useState([])
  const [teacher, setteacher] = useState([])
  const [open, setOpen] = useState(false)
  const [dep, setDep] = useState(false)
  const [edit, setEdit] = useState(null)

  const name = useRef()
  const start = useRef()
  const teachers = useRef()
  const courses = useRef()


  useEffect(() => {
    axios.get("https://65af84f32f26c3f2139b0190.mockapi.io/group")
      .then(res => setData(res.data))
      .catch(error => console.log(error))

    axios.get("https://65af84f32f26c3f2139b0190.mockapi.io/courses")
      .then(res => setCourse(res.data))
      .catch(error => console.log(error))

    axios.get("https://65af84f32f26c3f2139b0190.mockapi.io/teacher")
      .then(res => setteacher(res.data))
      .catch(error => console.log(error))


  }, [dep])


  const save = (e) => {
    e.preventDefault();
    let newData = {
      "name": name.current.value,
      "teacher": JSON.parse(teachers.current.value),
      "start_date": start.current.value,
      "end_date": edit ? edit.end_date : "",
      "students": edit ? edit.students : [],
      "course_name": JSON.parse(courses.current.value),
    }

    if (!edit) {
      axios.post("https://65af84f32f26c3f2139b0190.mockapi.io/group", newData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          setDep(!dep);
          setOpen(false);
          e.target.reset()
        })
        .catch(error => console.log(error))
        return;
    }

    axios.put(`https://65af84f32f26c3f2139b0190.mockapi.io/group/${edit.id}`, newData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        setDep(!dep);
        setOpen(false);
        setEdit(null)
        e.target.reset()
      })
      .catch(error => console.log(error))

  }

  const removeGroup = (id) => {
    axios.delete(`https://65af84f32f26c3f2139b0190.mockapi.io/group/${id}`)
      .then(() => setDep(!dep))
      .catch(error => console.log(error))
  }
  const getItem = (item) => {
    setEdit(item);
    setOpen(true)
    name.current.value = item.name;
    start.current.value = item.start_date
    teachers.current.value = JSON.stringify(item.teacher)
    courses.current.value = JSON.stringify(item.course_name)

  }



  return (
    <>
      <div className='News'>
        <h1 className='News-title'>Group</h1>
        <button className='Add' onClick={() => setOpen(true)}>Add</button>
      </div>   <div className='cours_boss'></div>

      <table>
        <thead>
          <tr>
            <th>Group</th>
            <th>Course</th>
            <th>Teacher</th>
            <th>Duration</th>
            <th>-/-</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(item => <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.course_name.name}</td>
              <td>{item.teacher.full_name} </td>
              <td>{item.course_name.duration}-oy</td>
              <td>
                <button className='add-icon' ><i className="bi bi-person-add" onClick={()=>navigate(`/group/${item.id}/${item.course_name.id}`)}></i></button>
                <button className='delete' onClick={() => removeGroup(item.id)}><i className="bi bi-trash3"></i></button>
                <button className='edit' onClick={() => getItem(item)}><i className="bi bi-pen"></i></button>
              </td>
            </tr>)
          }
        </tbody>
      </table>





      {/* popup */}
      <div className={open ? "modal-container modal-active" : "modal-container"} onClick={() => {
        setOpen(false);
        setEdit(null);
      }}>
        <div className='modal' onClick={(e) => e.stopPropagation()}>
          <h1 className='modal-title'>Create course</h1>
          <form className='form' onSubmit={save} >
            <input ref={name} required type="text" placeholder='Group  name' />
            <input ref={start} required type="date" placeholder='Group  name' />

            <select ref={courses}>
              {
                course.map(item => <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>)
              }
            </select>
            <select ref={teachers}>
              {
                teacher.map(item => <option key={item.id} value={JSON.stringify(item)}>{item.full_name}</option>)
              }
            </select>

            <button type='submit' className='add-new-course'>{edit ? "Update" : "Save"}</button>
          </form>
        </div>
      </div>
      {/* popup */}




    </>
  )
}





