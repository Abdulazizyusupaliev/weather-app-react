import axios from 'axios'
import '../css/news.css'
import React, { useEffect, useRef, useState } from 'react'
export default function News() {

  const [News, setNews] = useState([])
  const [open, setOpen] = useState(false)
  const [dep, setDep] = useState(false)
  const [editData, setEditData] = useState(null)
  const title = useRef()
  const date = useRef()

  const removeNews = (id) => {
    axios.delete(`https://65af84f32f26c3f2139b0190.mockapi.io/news/${id}`)
      .then(res => setDep(!dep))
      .catch(eror => console.log(eror))
  }
  useEffect(() => {
    axios.get("https://65af84f32f26c3f2139b0190.mockapi.io/news")
      .then(res => setNews(res.data))
      .catch(error => console.log(error))
  }, [dep])

  const saveNewNews = (e) => {
    e.preventDefault()

    let newNews = {
      title: title.current.value,
      "date": date.current.value,
      "active": editData ? editData.active : false,
    }
    if (!editData) {
      axios.post("https://65af84f32f26c3f2139b0190.mockapi.io/news", newNews, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(() => {
        setDep(!dep)
        e.target.reset()
        setOpen(false)
      })
        .catch(error => console.log(error))
    }
    else {
      axios.put(`https://65af84f32f26c3f2139b0190.mockapi.io/news/${editData.id}`, newNews, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(() => {
        setDep(!dep)
        e.target.reset()
        setOpen(false)
        setEditData(null)
      })
        .catch(error => console.log(error))
    }
  }

  const getId = (id) => {
    axios.get(`https://65af84f32f26c3f2139b0190.mockapi.io/news/${id}`)
      .then(res => {
        title.current.value = res.data.title;
        date.current.value = res.data.date;
        setEditData(res.data);
        setOpen(true)
      })
      .catch(eror => console.log(eror))
  }

  const editActive = (item)=>{
     item.active = true;
     axios.put(`https://65af84f32f26c3f2139b0190.mockapi.io/news/${item.id}`, item, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      setDep(!dep)
    })
      .catch(error => console.log(error))


  }



  return (
    <>
      <div className='News'>
        <h1 className='News-title'>News</h1>
        <button className='Add' onClick={() => setOpen(true)}>Add</button>
      </div>
      {
        News.map(item =>
          <div key={item.id} className='new'>
            <div className={item.active?"new-box old-news":"new-box new-news"}>
              <div className='new-content'>
                <h1 className='text'>{item.title}</h1>
                <h1 className='time'>{item.date}</h1>
              </div>
              <div className='news-actions'>
                {
                  item.active?<span><i className="bi bi-eye open-eye" ></i></span>:<span onClick={()=>editActive(item)}><i className="bi bi-eye-slash close-eye "></i></span>
                }
                
                
                <button className='delete' onClick={() => removeNews(item.id)}><i className='bi bi-trash3'></i></button>
                <button className='edit' onClick={() => getId(item.id)}> <i className="bi bi-pen"></i></button>
              </div>
            </div>
          </div>
        )
      }

      {/* popup */}

      <div className={open ? "modal-container modal-active" : "modal-container"} onClick={() => setOpen(false)}>
        <div className='modal' onClick={(e) => e.stopPropagation()}>
          <h1 className='modal-title'>Create News</h1>
          <form className='form' onSubmit={saveNewNews}>
            <textarea required ref={title} name="" id="" cols="5" rows="5"></textarea>
            <input required ref={date} type="date" />
            <button type='submit' className='add-new-News'>{editData ? "Update" : "Save"}</button>
          </form>
        </div>
      </div>

      {/* popup */}
    </>
  )
}
