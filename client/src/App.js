import {BrowserRouter, Route, Link} from 'react-router-dom';
import Cards from './components/Cards';
import Product from './components/Product';
import ProductScreen from './components/Products/detailsProduct';
import SignInScreen from './components/user/login';
import RegisterScreen from './components/user/register';

function App() {

  const openMenu = ()=>{
    document.querySelector('.sidebar').classList.add('open');
  }
  const closeMenu = ()=>{
    document.querySelector('.sidebar').classList.remove('open')
  }
  return (
    <BrowserRouter>

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
            <Route exact={true} path='/' component={Product}/>
            <Route path='/register' component={RegisterScreen}/>
            <Route path='/login' component={SignInScreen}/>
            <Route path="/detailProduct/:id" component={ProductScreen}/>
        </div>
      </main>
      <footer className="footer">All right reserved.</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
