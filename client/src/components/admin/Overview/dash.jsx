import React, { useEffect, useState } from 'react';
import { CheckCircleOutlined, DollarCircleOutlined, ProjectOutlined, UserOutlined } from '@ant-design/icons';
import "./dash.css"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import product from '../../../redux/reducers/product';
import { useHistory } from 'react-router';
const url = "http://127.0.0.1:3700";

export default function Stats(){
    const [productData, setProductData] = useState([]);
    const history = useHistory()
    const dispatch = useDispatch();

    const fetchData = async ()=>{
        try {
          const res = await axios.get(`${url}/api/product/`, {
            headers: {
              'authtoken': localStorage.getItem('authtoken')
            }
          });
          if(res.status === 200){
            setProductData(res.data.data);
          }
        } catch (error) {
          const res = error.response;
          console.log(error)
        }
      };
      useEffect(()=>{
        fetchData(dispatch, history)
    }, [dispatch])
    return(
        <div className="stat">
            <div data-aos="fade-up" className="stat-card" style={{ width: 200 }}>
                <ProjectOutlined className="stat-icon" />
                <h1>{productData.length}</h1>
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