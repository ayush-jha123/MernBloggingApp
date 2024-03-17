import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'
import { useContext, useEffect, useState } from 'react'
export default function Head() {
  const{ userInfo,setUserInfo}=useContext(UserContext)
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    }).then(resp => {
      resp.json().then(userInfo => {
        setUserInfo(userInfo)
      })
    })
  }, [])

  function logout(){
    fetch('http://localhost:4000/logout',{
      method:'POST',
      credentials:"include"
    })
    setUserInfo(null);
  }
  const username=userInfo?.username
  return (
    <header>
      <Link to='/' className='logo'>MyBlog</Link>
      <nav>
        {username && (
          <>
            <Link to='/create'>Create new post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}