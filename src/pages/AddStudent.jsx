import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../src/css/group.css'
import axios from 'axios'
export default function AddStudent() {
    const [students, setStudent] = useState([])
    const [editData, setEditData] = useState(null)
    const [reception, setReception] = useState([])
    const [courseId, setCourseId] = useState(null)
    const [dep, setDep] = useState(false)
    const param = useParams()

    useEffect(() => {

        axios.get(`https://65af84f32f26c3f2139b0190.mockapi.io/reception`)
            .then(item => {
                setReception(item.data.filter(item => item.course.id == param.course_id))
            })
            .catch(error => console.log(error))

        axios.get(`https://65af84f32f26c3f2139b0190.mockapi.io/group/${param.id}`)
            .then(item => {
                setStudent(item.data.students)
                setEditData(item.data)
            })
            .catch(error => console.log(error))
    }, [dep])

    const addStudentInGroup = (item) => {
        if (editData) {
            editData.students = [...editData.students, item];
            axios.put(`https://65af84f32f26c3f2139b0190.mockapi.io/group/${editData.id}`, editData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    removeReception(item.id)
                })
                .catch(error => console.log(error))
        }
    }


    const removeReception = (id) => {
        axios.delete(`https://65af84f32f26c3f2139b0190.mockapi.io/reception/${id}`)
            .then(res => {
                setDep(!dep)
            })
            .catch(error => console.log(error))
    }

    const removeStudentInGroup = (id) => {
        if (editData) {
            editData.students = editData.students.filter(item => item.id !== id)
            axios.put(`https://65af84f32f26c3f2139b0190.mockapi.io/group/${editData.id}`, editData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    setDep(!dep)
                })
                .catch(error => console.log(error))
        }
    }



    return (
        <div className='add-student-row'>

            <div className='add-student-col'>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>-/-</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reception.length > 0 ?
                                reception.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.student_name}</td>
                                            <td>{item.student_surname}</td>
                                            <td><button className="edit" onClick={() => addStudentInGroup(item)}><i className="bi bi-plus"></i></button></td>
                                        </tr>
                                    )
                                })
                                :
                                 <tr><td colSpan={3}>No data</td></tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className='add-student-col'>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>-/-</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.length > 0 ?
                                students.map(item => <tr key={item.id}>
                                    <td>{item.student_name}</td>
                                    <td>{item.student_surname}</td>
                                    <td>
                                        <button className='delete' onClick={() => removeStudentInGroup(item.id)} ><i className="bi bi-trash3"></i></button>
                                    </td>
                                </tr>)
                                :
                                <tr><td colSpan={3} style={{ textAlign: "center" }}>No Data</td></tr>
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}
