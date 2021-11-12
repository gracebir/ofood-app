import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {data} from './data';
function ProductScreen(props) {
    const [qty, setQty] = useState(1)
    const p =props.match.params.id;
    data.find(item=> console.log(item.id === p, p+"ppppppp",item.id+"idddddd" ) )
    const addToCart = ()=>{
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }

    return  (
        <div className="">
            <div className="back-to">
                <Link to='/'>Back to result</Link>
            </div>
                <div className="details">
                {/* <div className="details-image">
                    <img src={product.img} alt={data.id}/>
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{product.name}</h4>
                        </li>
                        <li>
                            {product.alt}
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
                    </ul>
                </div> */}
                {/* <div className="details-action">
                     <ul>
                        <li>
                             prix: {product.price}
                        </li>
                       <li>
                            Status: {product.countInStock > 0 ? "In stock": "Unavailable"}
                         </li>
                         <li>
                            Qty: <select value={qty} onChange={(e) => { setQty(e.target.value)}}> 
                               {[...Array(product.countInStock).keys()].map(x=>
                                    <option key={x+1} value = {x + 1}> {x + 1} </option>
                                )}
                            </select>
                        </li>
                        <li>
                            {
                            product.countInStock > 0 && <button onClick={addToCart} className='button primary'>Add to Cart</button>
                            }
                            
                        </li>
                    </ul>
                </div>  */}
            </div> 
        </div>
    )
}

export default ProductScreen