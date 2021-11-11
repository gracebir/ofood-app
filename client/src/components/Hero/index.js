import React,{useState} from 'react'
import { HeroContainer, HeroContent, HeroItems, HeroH1, HeroBtn, HeroP } from './HeroElement';

function Index() {
    return (
      <HeroContainer>
          <HeroContent>
              <HeroItems>
                  <HeroH1>Greatest Food Ever</HeroH1>
                  <HeroP>Ready in 60 seconds</HeroP>
                  <HeroBtn>Place Order</HeroBtn>
              </HeroItems>
          </HeroContent>
      </HeroContainer>
    )
}

export default Index
