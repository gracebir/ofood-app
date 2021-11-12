import React from 'react'
import Products from '../Products';
import { data } from '../Products/data';
import Features from '../Features';
import Hero from '../Hero'

function Product() {
    return (
        <>
            <Hero/>
            <Products  heading='Choose your favorite' data={data}/>
                <Features/>
            <Products heading='Sweet Treats for You' data={data}/>
        </>
    )
}

export default Product
