import React from 'react';
import './css/index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Layout/Nav/Nav';
import NavCategories from './components/Layout/NavCategories/NavCategories';
import Footer from './components/Layout/Footer/Footer';
import MAIN_PAGE from './components/Main_Page/MAIN_PAGE';

function App() {
  return (
    <div className="App">
      <Router>

        <Nav />
        <NavCategories />

        <Routes>

          <Route path='/' element={ <MAIN_PAGE /> } />

        </Routes>

        <Footer />

      </Router>
    </div>
  );
}

export default App;
