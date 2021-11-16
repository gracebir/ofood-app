import React, {useEffect, useState} from 'react'
import {Link, useParams, useHistory} from 'react-router-dom'
import {data} from './data';
import axios from 'axios';
const url = "http://127.0.0.1:3700"

function ProductScreen(props) {
    const params = useParams();
    const [ product, setProduct ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const [qty, setQty] = useState(1)
    const history = useHistory();
    const addToCart = ()=>{
        history.push("/cart/" + params.productId + "?qty=" + qty)
    }
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
                console.log(product);
            }
        } catch (error) {
            setLoading(false)
        }
    };

    useEffect(() =>{
        fetchUser();
    }, [ params.productId ]);
    return  (
        <div className="">
            <div className="back-to">
                <Link to='/'>Back to result</Link>
            </div>
                <div className="details">
                <div className="details-image">
                   <img src={product.avatar} alt={product.id}/>
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h3>{product.name}</h3>
                        </li>
                        <li>
                            {product.categorie}
                        </li>
                        <li>
                            Prix: <b style={{color:"#bb2124"}}>{product.price}$</b> 
                        </li>
                        <li>
                            Description:
                            <div>
                                {product.desc}
                            </div>
                        </li>
                        <li>
                            Quantity in stock: <b> {product.qty}</b>
                        </li>
                    </ul>
                </div>
                <div className="details-action">
                     <ul>
                        <li>
                             prix: <b>$ {product.price} </b>
                        </li>
                       <li>
                            Status: {product.qty > 0 ? "In stock": "Unavailable"}
                         </li>
                         <li>
                            Qty: <select value={qty} onChange={(e) => { setQty(e.target.value)}}> 
                               {[...Array(product.qty).keys()].map(x=>
                                    <option key={x+1} value = {x + 1}> {x + 1} </option>
                                )}
                            </select>
                        </li>
                        <li>
                            {
                            product.qty > 0 && <button onClick={addToCart} className='button primary'>Add to Cart</button>
                            }
                            
                        </li>
                    </ul>
                </div> 
            </div> 
        </div>
    )
}

export default ProductScreen