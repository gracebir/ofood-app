import {Popover } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

export default function Nav({children}) {
  const { data } = useSelector(({ users: { currentUser } }) =>currentUser);
  const disconnect = () =>{
      localStorage.removeItem('authtoken');
      window.location.replace('/login');
  }
  const content = (
      <div>
        <p>Profile</p>
        <p style={{ cursor: 'pointer' }} onClick={disconnect} >Deconnexion</p>
      </div>
    );
    const openMenu = ()=>{
        document.querySelector('.side').classList.add('open');
      }
      const closeMenu = ()=>{
        document.querySelector('.side').classList.remove('open')
      }
    return (
    <div className="grid-container">
      <header className="header">
        <div className="brand">
            <button onClick={openMenu}>
                &#9776;
            </button>
            <Link to="/">Somba</Link>
        </div>
        <div className="header-links">
            <Link to='/cart'>Cart</Link>
            {
              data ?  
              <Popover placement='bottomRight' content={content} title={ <h2> {data.fsname} {data.lsname} </h2> } trigger="click">
                <img src={data.avatar} alt={data.fsname} className="avatar"/>
              </Popover> 
              :
            <Link to="/login">Sign-In</Link>
            }
        </div>
      </header>
      <aside className="side">
        <h3>Shopping Categories</h3>
        <button className="sidebar-close-button" onClick={closeMenu}>x</button>
        <ul className="sidebar-links">
            <li>
                <Link to='/'>Pizza</Link> 
            </li>
            <li>
                <Link to='/'>Desserts</Link> 
            </li>
        </ul>
       </aside>

      <main className="main">
        <div className="content">
            {children}
        </div>
      </main>
      <footer className="footer">All right reserved.</footer>
    </div>
    )
}
