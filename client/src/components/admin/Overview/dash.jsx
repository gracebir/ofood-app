import React, { useEffect } from 'react';
import { CheckCircleOutlined, DollarCircleOutlined, ProjectOutlined, UserOutlined } from '@ant-design/icons';
import "./dash.css"
import { useSelector } from 'react-redux';

export default function Stats(){
    const {data} = useSelector(({products: {productList}})=>productList);
    return(
        <div className="stat">
            <div data-aos="fade-up" className="stat-card" style={{ width: 200 }}>
                <ProjectOutlined className="stat-icon" />
                <h1>{data.length}</h1>
                <div>Total product</div>
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