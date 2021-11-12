import React from 'react';
import './sideBar.component.css';
import { Link } from 'react-router-dom';
import { AttachMoney, BarChart, DeleteOutline, LineStyle, PeopleOutline, PermIdentity, Storefront, Timeline } from '@mui/icons-material';

export default function SideBar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/" className="link">
                            <li className="sidebarListItem active">
                                <LineStyle className="sidebarIcon"/>
                                Home   
                            </li>
                        </Link>
                        <Link to='/revenues' className= "link"> 
                            <li className="sidebarListItem">
                                <Timeline className="sidebarIcon"/>
                                Revenue   
                            </li>
                        </Link>
                        <Link to='/ventes' className="link">
                        <li className="sidebarListItem">
                                <AttachMoney className="sidebarIcon"/>
                                Transactions   
                            </li> 
                        </Link>
                    </ul>
                </div>

                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/users" className="link">
                            <li className="sidebarListItem">
                                <PermIdentity className="sidebarIcon"/>
                                Agents   
                            </li>
                        </Link>
                        <Link to="/clients" className="link">
                            <li className="sidebarListItem">
                                <PeopleOutline className="sidebarIcon"/>
                                Clients  
                            </li>
                        </Link>
                        <Link to="/products" className="link">
                            <li className="sidebarListItem">
                                <Storefront className="sidebarIcon"/>
                                Carts  
                            </li>
                        </Link>
                        <Link to='/rapports' className="link">
                            <li className="sidebarListItem">
                                <BarChart className="sidebarIcon"/>
                                Rapport  
                            </li>   
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Corbeille</h3>
                    <ul className="sidebarList">
                        <Link to='/trash' className="link">
                            <li className="sidebarListItem">
                                    <DeleteOutline className="sidebarIcon"/>
                                    Corbeille   
                                </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}
