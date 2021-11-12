import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function RegisterScreen(props) {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [rePassword, setRePassword] = useState('');

         const submitHandler = (e)=>{
             e.preventDefault();
         }
         return  (
             <div className="form">
                 <form action="" onSubmit={submitHandler}>
                     <ul className="form-container">
                         <li>
                             <h2>Create Account</h2>
                         </li>
                         <li>
                             <label htmlFor="name">
                                 Name
                             </label>
                             <input type="name" name="name" id="name" onChange ={(e)=>setName(e.target.value)}  />
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
                             <label htmlFor="rePassword">
                                 Confirm Password
                             </label>
                             <input type="password" id="rePassword" name="rePassword" onChange = {(e)=>setRePassword(e.target.value)} />
                         </li>
                         <li>
                             <button type="submit" className="button primary">Register</button>
                         </li>
                         <li>
                             All ready have account to somba? <Link to='/login'>Sign-in</Link>
                         </li>
                     </ul>
                 </form>
             </div>
         )
}

export default RegisterScreen