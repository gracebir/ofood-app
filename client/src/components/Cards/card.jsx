
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useParams, useLocation,useHistory} from 'react-router-dom'
import { Empty } from 'antd';
import { addToCart, removeFromCart } from '../../redux/actions/cartItem';

function CartScreen(props) {

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    console.log(cartItems)
    const params = useParams()
    const location = useLocation()
    const history = useHistory()

    const productId = params.productId;
    const qty = location.search? Number(location.search.split("=")[1]):1;
    const dispatch = useDispatch()

    const removeFromCartHandler = (productId)=>{
        dispatch(removeFromCart(productId));
    }

    const checkoutHandler = ()=>{
        history.push("/login?redirect=shipping")
    }

    useEffect(() => {
       if(productId){
           dispatch(addToCart(productId,qty));
       }
    }, [])
    return (
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Prix</div>
                    </li>
                    {
                        cart.length ===0 ?
                        <div>
                            <Empty/>
                            Cart is empty
                        </div>
                        :
                        cart.map(item=>
                            <div>
                               <div className="cart-image">
                                   <img src={item.avatar} alt="product" />
                               </div>
                               <div className="cart-name">
                                   <div>
                                       <Link to={"/product" + item.product}>
                                        {item.name}
                                       </Link>
                                   </div>
                                   <div>
                                      Qty: 
                                      <select value={item.qty} onChange={(e)=>dispatch(addToCart(item.product, e.target.value))} >
                                            {[...Array(item.qty).keys()].map(x=>
                                                <option key={x+1} value = {x + 1}> {x + 1} </option>
                                            )}
                                      </select>
                                      <button type="button" className="button" onClick={()=>removeFromCartHandler(item.product)}>Delete</button> 
                                   </div>
                               </div>
                               <div className="cart-price">
                                   $ {item.price}
                               </div>
                            </div>
                        )
                    }
                </ul>
            </div>
            <div className="cart-action">
                <h3>
                    subtotal ({cart.reduce((a,b) => a + b.qty, 0)} items)
                    :
                    $ {cart.reduce((a,b) => a + b.price * b.qty, 0)}
                </h3>
                <button onClick={checkoutHandler} className="button primary full-width" disabled={cart.length === 0}> Proceed to Checkout</button>
            </div>
        </div>
    )
}

export default CartScreen