import React from 'react'
import { Nav, NavLink, NavIcon, Bars } from './NavbarEl'

function index() {
    return (
        <>
        <Nav>
           <NavLink to="/">oFood</NavLink>
           <NavIcon>
               <p>Menu</p>
               <Bars/>
           </NavIcon>
        </Nav>
        </>
    )
}

export default index
