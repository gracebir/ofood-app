import React, { useEffect, useState } from 'react'
import Products from '../Products';
// import { data } from '../Products/data';
import Features from '../Features';
import Hero from '../Hero'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import axios from 'axios';

const url = "http://127.0.0.1:3700"
function Product() {
    const dispatch = useDispatch();
    const history = useHistory();
     const [userData, setData] = useState([]);

    const fetchData = async ()=>{
        try {
          const res = await axios.get(`${url}/api/product/`, {
            headers: {
              'authtoken': localStorage.getItem('authtoken')
            }
          });
          if(res.status === 200){
            setData(res.data.data);
          }
        } catch (error) {
          const res = error.response;
          console.log(error)
        }
      };
      useEffect(()=>{
        fetchData(dispatch, history)
    }, [dispatch])
    return (
        <>
            <Hero/>
            <Products  heading='Choose your favorite' data={userData}/>
                <Features/>
            <Products heading='Sweet Treats for You' data={userData}/>
        </>
    )
}

export default Product
