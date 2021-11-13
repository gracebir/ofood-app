
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import Nav from './components/nav/topnav';
import Product from './components/Product';
import ProductScreen from './components/Products/detailsProduct';
import SignInScreen from './components/user/login';
import RegisterScreen from './components/user/register';
import Stats  from './components/admin/Overview/dash';
import NotFound  from './helpers/404';
import Overview from './components/admin/Overview';
import { AdminRoute } from './routes/protectedRoute';

const AppRoutes = ()=>{
  return (
      <div>
      <Switch>
        <Route key="signup" exact path="/register" render={() =><RegisterScreen />} />
        <Route key="login" path="/login" render={() =><SignInScreen />} />
        
        <Route path="/admin">
            <Overview>
                <Switch>
                  <AdminRoute key="admin-home" exact path="/admin" component={Stats}/>
                </Switch>
            </Overview>
        </Route>

        <Nav>
            <Switch>
                <Route key="home" exact path="/" render={() => <Product />}/>
                <Route key="result" exact path="/search-menus" render={() => <ProductScreen />}/>
                <Route path="*">
                  <NotFound />
                </Route>
            </Switch>
        </Nav>
        
    </Switch>
      </div>
  )
}
function App() {
  return(
    <>  
    <Router>
      <AppRoutes/>
    </Router>
    </>
  )
}

export default App;
