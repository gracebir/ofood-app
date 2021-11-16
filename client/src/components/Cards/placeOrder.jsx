
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useParams, useLocation,useHistory} from 'react-router-dom'
import { Button, Empty } from 'antd';
import { addToCart, removeFromCart } from '../../redux/actions/cartItem';
import CheckOutSteps from './checkOutSteps';

function PlaceOlderScreen(props) {

    const params = useParams()
    const location = useLocation()
    const history = useHistory()

    const dispatch = useDispatch()
    const {cartItems, shipping, payment} = useSelector(state => state.cartItems);
    if(!shipping){
        history.push('/shipping')
    }else
    if(!payment){
        history.push('/payment')
    }
  console.log(cartItems)

  const itemsPrice = cartItems.reduce((a,c)=> a + c.price*c.qty, 0);
  const shippingPrice = itemsPrice >100 ? 0 : 10;
  const taxPrice = 0.15*itemsPrice;
  const totalPrice = itemsPrice + shipping + taxPrice;

  const placerOrderHandler = ()=>{
    history.push("/placeorder")
}

    useEffect(() => {

    }, [])
    return (
        <div>
        <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
        <div className="placerOrder">
            <div className="placerOrder-info">
                <div>
                    <h3>Shipping</h3>
                    <div>
                    {/* {cartItems.shipping.address},{cartItems.shipping.city},
                    {cartItems.shpping.country},{cartItems.shipping.postalCode} */}
                    </div>
                </div>
                <div>
                    <h3>Payment</h3>
                    <div>
                       Payment Method: 
                       {/* {cartItems.payment.paymentMetod} */}
                    </div>
                </div>
                <div>
                    <ul className="cart-list-container">
                        <li>
                            <h3>Shopping Cart</h3>
                            <div>Prix</div>
                        </li>
                        {
                            cartItems.length ===0 ?
                            <div>
                                <Empty/>
                                Cart is empty
                            </div>
                            :
                            cartItems.map(item=>
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
                                        Qty: {item.qty}
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
            </div>
            <div className="placerOrder-action">
                <ul>
                    <li>
                        <button className="button primary full-width" onClick={placerOrderHandler}>Placer Order</button>
                    </li>
                    <li>
                        <h3>Order Summary</h3>
                    </li>
                    <li>
                        <div>Items</div>
                        <div> $ {itemsPrice}</div>
                    </li>
                    <li>
                        <div>Shipping</div>
                        <div> $ {shippingPrice}</div>
                    </li>
                    <li>
                        <div>Tax</div>
                        <div> $ {taxPrice}</div>
                    </li>
                    <li>
                        <div>Order Total</div>
                        <div> $ {totalPrice}</div>
                    </li>
                </ul>
            </div>
        </div>
        </div>
    )
}

export default PlaceOlderScreen