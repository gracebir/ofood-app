import React from 'react'
import { FeatureContainer, FeatureButton } from './FeaturesElements';

function Features() {
    return (
       <FeatureContainer>
           <h1>Pizza of the Day</h1>
           <p>Truffle alfredo sauce topped with 24 carat gold dust.</p>
           <FeatureButton>Order Now</FeatureButton>
       </FeatureContainer>
    )
}

export default Features
