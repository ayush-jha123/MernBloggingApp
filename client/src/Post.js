import {formatISO9075} from 'date-fns'
import { Link } from 'react-router-dom'
export default function Post({_id,title,summary,content,cover,createdAt,author}){
    return(
    <div className='post'>
    <div className='image'>
    <Link to={`/post/${_id}`}>
    <img src={'http://localhost:4000/'+cover}/>
    </Link>
    </div>
    <div className='text'>
    <Link to={`/post/${_id}`}>
    <h1>{title}</h1>
    </Link>
    <p className='info'>
      <a className='author'>{author.username}</a>
      <time>{formatISO9075(new Date(createdAt))}</time>
    </p>
    <p>{summary} </p>
    </div>
  </div>
    )
}
// 'https://techcrunch.com/wp-content/uploads/2023/10/disney-on-tiktok.png?w=1390&crop=1'

// src="http://localhost/4000/uploads\612d93543c5eea0665f5340ed02965a5.png"