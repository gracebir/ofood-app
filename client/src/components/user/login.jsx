import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

function SignInScreen(props) {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 
        
        const submitHandler = (e)=>{
            e.preventDefault();
        }
        return  (
            <div className="form">
                <form action="" onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>Sign-In</h2>
                        </li>
                        <li>
                            <label htmlFor="email">
                                Email
                            </label>
                            <input type="email" name="email" id="email" onChange ={(e)=>setEmail(e.target.value)}  />
                        </li>
                        <li>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input type="password" id="password" name="password" onChange = {(e)=>setPassword(e.target.value)} />
                        </li>
                        <li>
                            <button type="submit" className="button primary">SignIn</button>
                        </li>
                        <li>
                            New to Somba
                        </li>
                        <li>
                            <Link to="/register" className="button secondary text-center">Create your Somba account</Link>
                        </li>
                    </ul>
                </form>
            </div>
        )
}

export default SignInScreen