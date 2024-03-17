import { useContext, useState } from "react"
import {Navigate} from 'react-router-dom'
import { UserContext } from "../UserContext"
export default function LoginPage(){
    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')
    const [redirect,setredirect]=useState(false)
    const {setUserInfo}=useContext(UserContext)
    async function login(e){
        e.preventDefault();
      const response= await fetch('http://localhost:4000/login',{
            method:'POST',
            headers:{'content-Type':'application/json'},
            body:JSON.stringify({username,password}),
            credentials:'include'
        })
        if(response.ok){
            response.json().then(userInfo=>{
                setUserInfo(userInfo)
                setredirect(true);
            })
        }else{
            alert('wrong credentials')
        }
    }
    if(redirect){
        return <Navigate to={'/'}/>
    }
    return(
        <form className="Login" onSubmit={login}>
        <h1>Login</h1>
        <input type="text" placeholder="UserName" value={username} onChange={(e)=>setusername(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
        <button>Login</button>
        </form>
    )
}