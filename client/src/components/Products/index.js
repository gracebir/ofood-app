import React, { Children } from 'react';
import {useHistory} from 'react-router-dom'
import product1 from '../../assets/pizza-1.jpg'
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
                <ProductImg src={product.avatar}
                />
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
