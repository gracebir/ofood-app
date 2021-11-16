import { Button } from 'antd';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { savePayment } from '../../redux/actions/cartItem';
import CheckOutSteps from './checkOutSteps';

function PaymentScreen(props) {
        const dispatch = useDispatch();
        const history = useHistory()
        const [paymentMetod, setPayment] = useState('');;

         const submitHandler = (e)=>{
             e.preventDefault();
             savePayment({
                 paymentMetod: paymentMetod,
             })(dispatch)
             history.push('/placeorder')
         }
         return  (
             <div>
                 <CheckOutSteps step1 step2 step3></CheckOutSteps>
             <div className="form">
                 <form action="" onSubmit={(submitHandler)}>
                     <ul className="form-container">
                         <li>
                             <h2>Payment</h2>
                         </li>
                         <li>
                             <div>
                                <input type="radio" name="paypalMethod" id="paypalMethod" value="Paypal" onChange ={(e)=>setPayment(e.target.value)}  />
                                <label htmlFor="address">
                                    Paypal
                                </label>
                            </div>
                         </li>
                         <li>
                             <Button type="primary" htmlType="submit" block>Continue</Button>
                         </li>
                     </ul>
                 </form>
             </div>
             </div>
         )
}

export default PaymentScreen