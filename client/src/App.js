import { BrowserRouter as Router} from 'react-router-dom'
import { GlobalStyle } from './globalStyle';
import Hero from './components/Hero';
import Products from './components/Products';
import { productData, productDataTwo } from './components/Products/data';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <GlobalStyle/>
      <Hero/>
      <Products heading='Choose your favorite' data={productData}/>
      <Features/>
      <Products heading='Sweet Treats for You' data={productDataTwo}/>
      <Footer/>
    </Router>
  );
}

export default App;
