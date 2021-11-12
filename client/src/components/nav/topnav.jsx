import React from 'react'

export default function Nav({children}) {
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
      <aside className="sidebar">
        <h3>Shopping Categories</h3>
        <button className="sidebar-close-button" onClick={closeMenu}>x</button>
        <ul className="sidebar-links">
            <li>
                <a href="index.html">Pizza</a> 
            </li>
            <li>
                <a href="index.html">Desserts</a> 
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
