import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Trust from './components/Trust/Trust';
import Products from './components/Products/Products';
import Why from './components/Why/Why';
import Testimonials from './components/Testimonials/Testimonials';
import CTA from './components/CTA/CTA';
import Footer from './components/Footer/Footer';
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Trust />
      <Products />
      <Why />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
