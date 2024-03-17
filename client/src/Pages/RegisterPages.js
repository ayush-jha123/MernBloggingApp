import { useState } from 'react'
export default function RegisterPage() {
    const [username, setuserName] = useState('')
    const [password, setpassword] = useState('')
   async function register(e) {
        e.preventDefault(); 
        const response= await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        });
        console.log(response);
        if(response.status===200){
            alert('Registration Successful')
        }
        else{
            alert('registration failed')
        }
    }
    return (
        <form className="Register" >
            <h1>Register</h1>
            <input type="text" placeholder="UserName" value={username} onChange={(e) => setuserName(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
            <button onClick={register}>Register</button>
        </form>
    )
}