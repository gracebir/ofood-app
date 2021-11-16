import React from 'react'

export default function CheckOutSteps(props) {
    return (
        <div className="checkout-steps">
            <div className ={props.step1 ? 'active': ''}>Sigin</div>
            <div className ={props.step2 ? 'active': ''}>Chipping</div>
            <div className ={props.step3 ? 'active': ''}>Payement</div>
            <div className ={props.step4 ? 'active': ''}>Place Order</div>
        </div>
    )
}
