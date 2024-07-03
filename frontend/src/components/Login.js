import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorDetails,setErrorDetails] = React.useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/")
        }
    }, [])

    const handleLogin = async () => {
        let result = await fetch("https://e-commerce-dashboard-l9tl.onrender.com/login", {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result)
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate("/")
        } else {
            setErrorDetails(true);
            return false;
            // alert("Please enter correct details")
        }
    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <input type="email" className="inputBox" placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)} value={email} /> 
                {/* The value of this input field is bound to the email state variable. */}

            <input type="password" className="inputBox" placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)} value={password} />

            {errorDetails && <span className='invalid-input'>Please enter correct details</span>}

            <button onClick={handleLogin} className="appButton" type="button">Login</button>
        </div>
    )
}

export default Login