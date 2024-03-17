import { useState, useEffect } from "react"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate, useParams } from 'react-router-dom';
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, settitle] = useState('')
  const [summary, setsummary] = useState('')
  const [content, setcontent] = useState('')
  const [files, setFiles] = useState('')
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    fetch('http://localhost:4000/post/' + id)
      .then(response => {
        response.json().then(postInfo => {
          settitle(postInfo.title);
          setcontent(postInfo.content);
          setsummary(postInfo.summary)
        })
      })
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0])
    }
    const response = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include'
    })
    if (response.ok) {
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to={'/post/'+id}/>
  }
  return (
    <form onSubmit={updatePost}>
      <input type="text" placeholder="Title of Post" value={title} onChange={(e) => settitle(e.target.value)}></input>

      <input type="summary" placeholder="summary" value={summary} onChange={(e) => setsummary(e.target.value)}></input>
      <input type="file" onChange={e => setFiles(e.target.files)}></input>

      <Editor onChange={setcontent} value={content} />

      <button>Update Post</button>
    </form>
  )
}