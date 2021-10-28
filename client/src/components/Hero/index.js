import React,{useState} from 'react'
import Navbar from '../Nabar'
import { HeroContainer, HeroContent, HeroItems, HeroH1, HeroBtn, HeroP } from './HeroElement';
import Sidebar from '../Sidebar'

function Index() {
    const [isOpen, setIsOpen ] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
      <HeroContainer>
          <Navbar toggle={toggle}/>
          <Sidebar isOpen={isOpen} toggle={toggle}/>
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
