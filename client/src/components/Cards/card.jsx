
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory,useParams} from 'react-router-dom'
import { Empty } from 'antd';
import axios from 'axios';
const url = "http://127.0.0.1:3700";

function CartScreen(props) {
    const parms = useParams();
    const params = useParams();
    const [ products, setProduct ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const [qty, setQty] = useState(1)
    const history = useHistory();

    const fetchUser = async() =>{
        try {
            const res = await axios.get(`${url}/api/product/by-id/${params.productId}`, {
                headers: {
                    'authtoken': localStorage.getItem('authtoken')
                }
            });
            if(res.status === 200){
                setLoading(false)
                setProduct(res.data.data);
                console.log(products);
            }
        } catch (error) {
            setLoading(false)
        }
    };

    useEffect(() =>{
        fetchUser();
    }, [ params.productId ]);
    return (
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Prix</div>
                    </li>
                    {
                        products.length ===0 ?
                        <div>
                            <Empty/>
                        </div>
                        :
                            <div>
                               <div className="cart-image">
                                   <img src={products.image} alt="product" />
                               </div>
                               <div className="cart-name">
                                   <div>
                                       <Link to={"/product" + products.id}>
                                        {products.name}
                                       </Link>
                                   </div>
                                   <div>
                                      Qty: 
                                      <select value={products.qty}  >
                                            {[...Array(products.qty).keys()].map(x=>
                                                <option key={x+1} value = {x + 1}> {x + 1} </option>
                                            )}
                                      </select>
                                      <button type="button" className="button">Delete</button> 
                                   </div>
                               </div>
                               <div className="cart-price">
                                  $ {products.price}
                               </div>
                        </div>
                    }
                </ul>
            </div>
            <div className="cart-action">
                <h3>
                    subtotal {products.qty}
                   :
                    $ {products.price}
                </h3>
                <button className="button primary full-width"> Proceed to Checkout</button>
            </div>
        </div>
    )
}

export default CartScreen