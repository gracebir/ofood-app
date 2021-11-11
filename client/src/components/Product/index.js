import React from 'react'
import Products from '../Products';
import { productData, productDataTwo } from '../Products/data';
import Features from '../Features';
import Hero from '../Hero'

function Product() {
    return (
        <>
            <Hero/>
            <Products  heading='Choose your favorite' data={productData}/>
                <Features/>
            <Products heading='Sweet Treats for You' data={productDataTwo}/>
        </>
    )
}

export default Product
