
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import Nav from './components/nav/topnav';
import Product from './components/Product';
import ProductScreen from './components/Products/detailsProduct';
import SignInScreen from './components/user/login';
import RegisterScreen from './components/user/register';
import Routes from './admin';

const AppRoutes = ()=>{
  return (
      <div>
      <Switch>
        <Route path='/admin' component={Routes}/>
        <Route path='/register' component={RegisterScreen}/>
        <Route path='/login' component={SignInScreen}/>
        <Nav>
          <Route exact={true} path='/' component={Product}/>
          <Route path="/detailProduct/:id" component={ProductScreen}/>
        </Nav>
      </Switch>
      </div>
  )
}
function App() {
  return(
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  )
}

export default App;
