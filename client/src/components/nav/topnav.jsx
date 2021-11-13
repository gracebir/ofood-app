import React from 'react';
import {Link} from 'react-router-dom';

export default function Nav({children}) {
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
            <Link to="/login">Sign-In</Link>
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
