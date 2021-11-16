import { Button } from 'antd';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { saveShipping } from '../../redux/actions/cartItem';
import CheckOutSteps from './checkOutSteps';

function ShippingScreen(props) {
        const dispatch = useDispatch();
        const history = useHistory()
        const [address, setAddress] = useState('');
        const [city, setCity] = useState('');
        const [country, setCountry] = useState('');
        const [postalCode, setPostalCode] = useState('');

         const submitHandler = (e)=>{
             e.preventDefault();
             saveShipping({
                 address: address,
                 city: city,
                 country: country,
                 postalCode: postalCode,
             })(dispatch)
             history.push('/payment')
         }
         return  (
             <div>
                 <CheckOutSteps step1 step2></CheckOutSteps>
             <div className="form">
                 <form action="" onSubmit={(submitHandler)}>
                     <ul className="form-container">
                         <li>
                             <h2>Shipping</h2>
                         </li>
                         <li>
                             <label htmlFor="address">
                                 Address
                             </label>
                             <input type="name" name="address" id="address" onChange ={(e)=>setAddress(e.target.value)}  />
                         </li>
                         <li>
                             <label htmlFor="city">
                                 City
                             </label>
                             <input type="name" name="city" id="city" onChange ={(e)=>setCity(e.target.value)}  />
                         </li>
                         <li>
                             <label htmlFor="postal">
                                 Postal Address
                             </label>
                             <input type="name" name="postal" id="postal" onChange ={(e)=>setPostalCode(e.target.value)}  />
                         </li>
                         <li>
                             <label htmlFor="country">
                                 Country
                             </label>
                             <input type="name" name="country" id="country" onChange ={(e)=>setCountry(e.target.value)}  />
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

export default ShippingScreen