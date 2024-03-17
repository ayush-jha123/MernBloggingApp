import Post from '../Post'
import { useState,useEffect } from 'react'
export default function IndexPage(){
    const [posts,setPosts]=useState([])
    useEffect(()=>{
        fetch('http://localhost:4000/post').then(res=>{
            res.json().then(posts=>{
                setPosts(posts)
            })
        })
    },[])
    return(
        <>
        {posts.length>0 && posts.map(post=>(
            <Post {...post}/>
        ))}
        {/* <Post/> */}
        </>
    )
}