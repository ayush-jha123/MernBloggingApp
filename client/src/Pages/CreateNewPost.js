import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {useState} from 'react'
import { Navigate } from 'react-router-dom';
import Editor from "../Editor";
export default function CreatePost(){
    const [title,settitle]=useState('')
    const [summary,setsummary]=useState('')
    const [content,setcontent]=useState('')
    const [files,setFiles]=useState('')
    const [redirect,setRedirect]=useState(false)
    async function createNewPost(e){
        const data=new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files[0])
        e.preventDefault();
       const response=await fetch('http://localhost:4000/post',{
            method:'POST',
            body:data,
            credentials:'include'
        })
        if(response.ok){
            setRedirect(true)
        }
    }
    if(redirect){
        return <Navigate to={'/'}/>
    }
    return(
        <form onSubmit={createNewPost}>
        <input type="text" placeholder="Title of Post" value={title} onChange={(e)=>settitle(e.target.value)}></input>
        <input type="summary" placeholder="summary" value={summary} onChange={(e)=>setsummary(e.target.value)}></input>
        <input type="file" onChange={e=>setFiles(e.target.files)}></input>

        <Editor value={content} onChange={setcontent} />
        <button>Create Post</button>
        </form>
    )
}