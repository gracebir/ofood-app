import React from 'react'
import { Nav, NavLink, NavIcon, Bars } from './NavbarEl'

function index({ toggle }) {
    return (
        <>
        <Nav>
           <NavLink to="/">oFastFood.</NavLink>
           <NavIcon onClick={toggle}>
               <p>Menu</p>
               <Bars/>
           </NavIcon>
        </Nav>
        </>
    )
}

export default index
