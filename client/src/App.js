import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { GlobalStyle } from './globalStyle';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Product from './components/Product';
import Checkout from './components/Checkout';

function App() {
  return (
    <Router>
      <GlobalStyle/>
      <Hero/>
      <Switch>
        <Route exact path='/' component={Product}/>
        <Route exact path='/checkout' component={Checkout}/> 
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
