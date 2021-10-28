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

function index({ isOpen, toggle}) {
    return (
        <SidebarContent isOpen={isOpen} onClick={toggle}>
            <Icon>
                <CloseIcon/>
            </Icon>
            <SidebarMenu>
                <SidebarLink to="/">Pizza</SidebarLink>
                <SidebarLink to="/">Desserts</SidebarLink>
                <SidebarLink to="/">Full Menu</SidebarLink>
            </SidebarMenu>
            <SideBtnWrap>
                <SidebarRoute to="/">Order Now</SidebarRoute>
            </SideBtnWrap>
        </SidebarContent>
    )
}

export default index
