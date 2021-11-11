import React from 'react'
import { ProductsHeading } from '../Products/ProductElement';
import { 
    ProductCardCheckout, 
    ProductImgCheckout, 
    ProductInfoCheckout, 
    ProductPriceCheckout, 
    ProductsContainerCheckout, 
    ProductTitleCheckout } from './CardElements';

function Cards({data}) {
    return (
        <ProductsContainerCheckout>
            <ProductsHeading>
                My Orders
            </ProductsHeading>
            {data.map((product, index)=>{
                return(
                  <ProductCardCheckout key={index}>
                    <ProductImgCheckout src={product.img} alt={product.alt} />
                    <ProductInfoCheckout>
                        <ProductTitleCheckout>{product.name}</ProductTitleCheckout>
                        <ProductPriceCheckout>{product.price}</ProductPriceCheckout>
                    </ProductInfoCheckout>
                </ProductCardCheckout>
            )})}
        </ProductsContainerCheckout>
    )
}

export default Cards
