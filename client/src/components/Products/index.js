import React from 'react';
import {useHistory} from 'react-router-dom'
import { 
  ProductsContainer,
  ProductWrapper,
  ProductsHeading,
  ProductTitle,
  ProductCard,
  ProductImg,
  ProductInfo,
  ProductDesc,
  ProductPrice,
  ProductButton
 } from './ProductElement';

function ProductsCheckout({heading, data}) {

  const history = useHistory()
    return (
        <ProductsContainer id='pizza'>
        <ProductsHeading>{heading}</ProductsHeading>
        <ProductWrapper>
          {data?.map((product, index) => {
            return (
              <ProductCard key={index} onClick={()=>history.push(`/detailProduct/${product.id}`)}>
                <ProductImg>
                    {/* <img src={`http://127.0.0.1:3700/resource/${product.avatar}`}/> */}
                </ProductImg>
                <ProductInfo>
                  <ProductTitle>{product.name}</ProductTitle>
                  <ProductDesc>{product.desc}</ProductDesc>
                  <ProductPrice>$ {product.price}</ProductPrice>
                  <ProductButton onClick={()=>history.push(`/detailProduct/${product.id}`)}>{product.button}</ProductButton>
                </ProductInfo>
              </ProductCard>
            );
            })}
        </ProductWrapper>
      </ProductsContainer>
    )
}

export default ProductsCheckout
