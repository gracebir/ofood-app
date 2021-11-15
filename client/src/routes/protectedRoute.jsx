import { useEffect } from "react";
import { Route, Redirect, useHistory, useLocation } from "react-router-dom";

export function ProtectedRoute(props){
    const Component = props.component;
    // const history = useHistory();
    // const location = useLocation();
    // const { authUser } = useSelector(({ users: { user } }) =>user);
    
    return(
        <Route key={props.key} path={props.path} exact render={() =>(
            // authUser === false ? history.push("/login", { next: location.pathname || props.path }):
            <Component />
        )} />
    );
};


export function AdminRoute(props){
    // const Component = props.component;
    // const { isAdmin, } = useSelector(({ users: { user } }) =>user);
    // const history = useHistory();
    // const location = useLocation();

    return(
        <Route key={props.key} path={props.path} exact render={() =>(
            // isAdmin === false ? history.push("/login", { next: location.pathname || props.path }):
            <Component />
        )} />
    );
};