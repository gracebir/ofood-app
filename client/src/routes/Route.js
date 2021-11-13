import { BrowserRouter as Router} from "react-router-dom";
import {Route, Switch} from 'react-router'
import Overview from "../components/admin/Overview";
import Stats  from "../components/admin/Overview/dash";
import Nav from "../components/nav/topnav";
import Product from "../components/Product";
import ProductScreen from "../components/Products/detailsProduct";
import SignInScreen from "../components/user/login";

import RegisterScreen from "../components/user/register";
import NotFound  from "../helpers/404";
import { AdminRoute } from "./protectedRoute";

export function Routes(){
    return(<>
        <Router>
            <Switch>
                <Route key="signup" exact path="/register" render={() =><RegisterScreen />} />
                <Route key="login" path="/login" render={() =><SignInScreen />} />

                <Route path="/admin">
                    {/* <Overview> */}
                        <Switch>
                            <AdminRoute key="admin-home" exact path="/admin" component={Stats}/>
                        </Switch>
                    {/* </Overview> */}
                </Route>

                <Nav>
                    <Switch>
                        <Route key="home" exact path="/" render={() => <Product />}/>
                        <Route key="result" exact path="/search-menus" render={() => <ProductScreen />}/>
                        {/* <Route path="*"><NotFound/></Route> */}
                    </Switch>
                </Nav>
                
            </Switch>
        </Router>
        </>
    );
};