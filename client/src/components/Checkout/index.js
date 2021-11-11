import React from 'react'
import Cards from '../Cards'
import { productData } from '../Products/data'
import { CheckoutContainer, CheckoutPayer, FoodCheckout } from './CheckoutElement'

function Checkout() {
    return (
        <CheckoutContainer>
            <FoodCheckout>
               <Cards
               data={productData}
               />
            </FoodCheckout>
            <CheckoutPayer>
                payement
            </CheckoutPayer>
        </CheckoutContainer>
    )
}

export default Checkout
