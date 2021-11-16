import { BrowserRouter as Router} from "react-router-dom";
import {Route, Switch, useHistory} from 'react-router'
import Overview from "../components/admin/Overview";
import Stats  from "../components/admin/Overview/dash";
import Nav from "../components/nav/topnav";
import Product from "../components/Product";
import ProductScreen from "../components/Products/detailsProduct";
import SignInScreen from "../components/user/login";

import RegisterScreen from "../components/user/register";
import NotFound  from "../helpers/404";
import { AdminRoute } from "./protectedRoute";
import CreateProduct from "../components/admin/pages/createProduct";
import CartScreen from "../components/Cards/card";
import { getCurrentUser } from "../redux/actions/userAction";
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ShippingScreen from "../components/Cards/shipping";
import PaymentScreen from "../components/Cards/Payement";
import PlaceOlderScreen from "../components/Cards/placeOrder";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '90vh'
    },
    button: {
      margin: theme.spacing(2),
    },
    placeholder: {
      height: 40,
    },
  }));
export function Routes(){
    const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { loading } = useSelector(({ users: { currentUser } }) =>currentUser)

  useEffect(() =>{
    getCurrentUser(dispatch, history)
  }, [ dispatch ])
    return(<>
        {
          loading ? <div className={classes.root}>
              <div className={classes.placeholder}>
                <Fade
                  in={loading}
                  style={{
                    transitionDelay: loading ? '300ms' : '0ms',
                  }}
                  unmountOnExit
                >
                  <CircularProgress />
                </Fade>
              </div>
          </div>:
        <Router>
            <Switch>
                <Route key="signup" exact path="/register" render={() =><RegisterScreen />} />
                <Route key="login" path="/login" render={() =><SignInScreen />} />

                <Route path="/admin">
                    <Overview>
                        <Switch>
                            <AdminRoute key="admin-home" exact path="/admin" component={Stats}/>
                            <AdminRoute key="admin-add-product" exact path="/admin/addProduct" component={CreateProduct}/>
                            <Route path="*"><NotFound/></Route>
                        </Switch>
                    </Overview>
                </Route>

                <Nav>
                    <Switch>
                        <Route key="home" exact path="/" render={() => <Product />}/>
                        <Route key="result" exact path="/detailProduct/:productId" render={() => <ProductScreen />}/>
                        <Route key="cart" exact path="/cart/:id?" render={()=><CartScreen/>}/>
                        <Route key="shipping" exact path="/shipping" render={()=><ShippingScreen/>}/>
                        <Route key="payment" exact path="/payment" render={()=><PaymentScreen/>}/>
                        <Route key="placer-order" exact path="/placeorder" render={()=><PlaceOlderScreen/>}/>
                        <Route path="*"><NotFound/></Route>
                    </Switch>
                </Nav>
                
            </Switch>
        </Router>}
        </>
    );
};