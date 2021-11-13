import React, { useEffect } from 'react';
import { CheckCircleOutlined, DollarCircleOutlined, UserOutlined } from '@ant-design/icons';
import "./dash.css"

export default function Stats(){
    return(
        <div className="stat">
            <div data-aos="fade-up" className="stat-card" style={{ width: 200 }}>
                <UserOutlined className="stat-icon" />
                <h1>{0}</h1>
                <div>Utilisateurs actifs</div>
            </div>
            <div data-aos="fade-up" className="stat-card" style={{ width: 200 }}>
                <DollarCircleOutlined className="stat-icon"/>
                <h1>{0}</h1>
                <div>Commandes</div>
            </div>
            <div data-aos="fade-up" className="stat-card" style={{ width: 200 }}>
                <CheckCircleOutlined className="stat-icon" style={{ color: "green" }} />
                <h1>{0}</h1>
                <div>Commandes livres</div>
            </div>
        </div>
    )
}