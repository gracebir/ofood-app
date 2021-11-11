import React from 'react'
import { 
    SidebarContent,
    Icon, 
    CloseIcon,
     SidebarMenu,
     SidebarLink,
     SideBtnWrap,
     SidebarRoute
     } from './SidebarElement';

import { BsCart } from 'react-icons/bs'

function index({ isOpen, toggle}) {
    return (
        <SidebarContent isOpen={isOpen} onClick={toggle}>
            <Icon>
                <CloseIcon/>
            </Icon>
            <SidebarMenu>
                <SidebarLink to="#pizza">Pizza</SidebarLink>
                <SidebarLink to="#dessert">Desserts</SidebarLink>
                <SidebarLink to="/checkout">0 <BsCart/></SidebarLink>
            </SidebarMenu>
            <SideBtnWrap>
                <SidebarRoute to="#pizza">Order Now</SidebarRoute>
            </SideBtnWrap>
        </SidebarContent>
    )
}

export default index
