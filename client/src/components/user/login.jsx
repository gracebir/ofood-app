import { Button } from 'antd';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import { loginAction } from '../../redux/actions/userAction';

function SignInScreen(props) {
    const location= useLocation();
    const [email, setEmail] = useState('');
    const [pwd, setPassword] = useState('');
    const dispatch = useDispatch();
    const redirect = location.search?location.search.split("=")[1]: '/'
    const { loading, error } = useSelector(({ users: { login } }) =>login);

     const handlersubmit = (e)=>{
         e.preventDefault();
             loginAction({ 
                 email: email, 
                 pwd: pwd 
                
            })(dispatch);
     }
        return  (
            <div className="form">
                <form action="" onSubmit={(handlersubmit)}>
                    <ul className="form-container">
                        <li>
                            <h2>Sign-In</h2>
                        </li>
                        {
                             loading &&

                             <li>chargement...</li>
                         }
                         {
                             error && 
                             <div className="div-error"> {error} </div>
                         }
                        <li>
                            <label htmlFor="email">
                                Email
                            </label>
                            <input type="email" name="email" id="email" value={email} onChange ={(e)=>setEmail(e.target.value)}  />
                        </li>
                        <li>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input type="password" id="password" name="password" value={pwd} onChange = {(e)=>setPassword(e.target.value)} />
                        </li>
                        <li>
                            <Button  type="primary" disabled={!email || !pwd} loading={loading} htmlType='submit' block>SignIn</Button>
                        </li>
                        <li>
                            New to Somba
                        </li>
                        <li>
                            <Link to={redirect === "/" ? "register":'register?redirect='+redirect} className="button secondary text-center" >Create your Somba account</Link>
                        </li>
                    </ul>
                </form>
            </div>
        )
}

export default SignInScreen