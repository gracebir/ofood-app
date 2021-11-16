import { Button } from 'antd';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { registerAction } from '../../redux/actions/userAction';

function RegisterScreen(props) {
        const dispatch = useDispatch();
        const redirect = window.location.search?window.location.search.split("=")[1]: '/'
        const {loading, error} = useSelector(({users: register})=>register);

        const [fsname, setName] = useState('');
        const [lsname, setLsName] = useState('');
        const [email, setEmail] = useState('');
        const [phone, setPhone] = useState('');
        const [avatar, setAvatar] = useState('');

        const onFileChange = (e) =>{
            const file = e.target.files[0];
            if(file){
                const reader = new FileReader();
                reader.readAsDataURL(file)
                reader.onloadend = () =>{
                    setAvatar(reader.result);
                    console.log(avatar);
                }
            }
        }
         const submitHandler = (e)=>{
             e.preventDefault();
             registerAction({
                 fsname: fsname,
                 lsname: lsname,
                 email: email,
                 phone: phone,
                 avatar: avatar
             })(dispatch)
             
         }
         return  (
             <div className="form">
                 <form action="" onSubmit={(submitHandler)}>
                     <ul className="form-container">
                         <li>
                             <h2>Create Account</h2>
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
                             <label htmlFor="fsname">
                                 First Name
                             </label>
                             <input type="name" name="fsname" id="name" onChange ={(e)=>setName(e.target.value)}  />
                         </li>
                         <li>
                             <label htmlFor="lsname">
                                 Last Name
                             </label>
                             <input type="name" name="lsname" id="name" onChange ={(e)=>setLsName(e.target.value)}  />
                         </li>
                         <li>
                             <label htmlFor="email">
                                 Email
                             </label>
                             <input type="email" name="email" id="email" onChange ={(e)=>setEmail(e.target.value)}  />
                         </li>
                         <li>
                             <label htmlFor="phone">
                                 Phone
                             </label>
                             <input type="tel" id="phone" name="phone" onChange = {(e)=>setPhone(e.target.value)} />
                         </li>
                         <li>
                             <label htmlFor="avatar">
                                 Avatar
                             </label>
                             <input type="file" id="avatar" name="avatar" accept="*/image" onChange = {(e)=>onFileChange(e)} />
                         </li>
                         <li>
                             <Button disabled={!fsname || !lsname || !phone || !email} loading={loading} type="primary" htmlType="submit" block>Register</Button>
                         </li>
                         <li>
                             All ready have account to somba? <Link to={redirect === "/" ? "login":'login?redirect='+redirect}>Sign-in</Link>
                         </li>
                     </ul>
                 </form>
             </div>
         )
}

export default RegisterScreen