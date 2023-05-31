import React, { useState } from 'react'
import {Route, useNavigate} from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const [userCredential, setUserCredential] = useState({
        email: "",
        password: "",
        role: ""
    });
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false);
    const setCredential = (e) => {
        let nameOfData = e.target.name;
        let value = e.target.value;
        setUserCredential({ ...userCredential, [nameOfData]: value });
    }
    const sendData = async (e) => {
        e.preventDefault();
        const { email, password, role } = userCredential;
        const res = await fetch('/login', {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password, role
            })
        });

        const data = await res.json();
        console.log(data);
        console.log(JSON.stringify(data));
        if (data.state) {
            alert('Login Successful');
            localStorage.setItem('authenticated', true);
            setAuthenticated(true);
            localStorage.setItem('Status', data.status);
            localStorage.setItem('Name', data.name);
            navigate('/dashboard');
            window.location.reload();
          } else {
            alert('Invalid Credentials');
          }
    }
    return (
        <div className="container mt-5 m-auto w-50 border p-5">
            <form>
            <h1>Login</h1>
            <div className="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input name = "email" type="email" className = "form-control" aria-describedby="emailHelp" value = {userCredential.email} onChange = {setCredential}/>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input name = "password" type="password" class="form-control" id="exampleInputPassword1" value = {userCredential.password} onChange = {setCredential}/>
            </div> 
            <div class="mb-3">
            <label for="role" className = "form-label">Role</label>
            <select name = "role" className ="form-control" aria-describedby="emailHelp" value = {userCredential.role} onChange = {setCredential}>
                <option value = "Admin">Admin</option>
                <option value = "Farmer">Farmer</option>
                <option value = "Customer">Customer</option>
            </select>
            </div>
            <div className="mb-3"> 
                <a href = "/forgotpassword">Forgot Password?</a>
            </div>

            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" for="exampleCheck1">Remember Me</label>
            </div>
            <div className="mb-3">
                <a href = "/signup">New User? Sign Up</a>
            </div>

            <button type="submit" className="btn btn-primary" onClick = {sendData}>Submit</button>
            </form>
        </div>
    );
};

export default Login;
                

