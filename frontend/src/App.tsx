import React from 'react';
import './css/index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Layout/Nav/Nav';
import NavCategories from './components/Layout/NavCategories/NavCategories';
import Footer from './components/Layout/Footer/Footer';
import ArrowTop from './components/Layout/ArrowTop/ArrowTop';
import MAIN_PAGE from './components/Main_Page/MAIN_PAGE';
import PRODUCT_PAGE from './components/Product_Page/PRODUCT_PAGE';
import SIGNIN from './components/LoginRegister/SIGNIN';

function App() {
  return (
    <div className="App">
      <Router>

        <ArrowTop />
        <Nav />
        <NavCategories />

        <Routes>

          <Route path='/' element={ <MAIN_PAGE /> } />
          <Route path='/product/:id' element={ <PRODUCT_PAGE /> } />
          
          <Route path='/credentials/sign-in' element={ <SIGNIN /> } />

        </Routes>

        <Footer />

      </Router>
    </div>
  );
}

export default App;
