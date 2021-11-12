import React from 'react';
import './Navbar.component.css';
import { Avatar, Popover } from 'antd';
import { Settings } from '@mui/icons-material';
import SideBar from '../sideBar/sideBar.component';


export default function Navbar({children}) {
    const disconnect = () =>{
        localStorage.removeItem('auth-token');
        window.location.replace('/login');
    }

    const content = (
        <div>
          <p>Profile</p>
          <p style={{ cursor: 'pointer' }} onClick={disconnect} >Deconnexion</p>
        </div>
      );
    return (
        <div className="page">
            <div className="Navbar">
                <div className="navbar-wrapper">
                    <div className="navLeft">
                        <span className="logo">Mille Services</span>
                    </div>
                    <div className="navRight">
                        <div className="navbarIconsContainer">
                            <Settings/>
                        </div>
                        <Popover placement='bottomRight' content={content} title={ <h2> Ibrahim Bagalwa</h2> } trigger="click">
                        <Avatar children={<img src={`https://ms-backapp.herokuapp.com/resource/${data.avatar}`} alt={data.fsname} className="avatar"/>} />
                        </Popover>
                    </div>
                </div>
                <SideBar />
            </div>
            <div className="page-body">
                {children}
            </div>
        </div>
    )
}
