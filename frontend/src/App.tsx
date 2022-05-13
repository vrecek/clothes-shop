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
import REGISTER from './components/LoginRegister/REGISTER';
import ERROR_PAGE from './components/Error_Page/ERROR_PAGE';
import PANEL from './components/Panel/PANEL';
import USERPROFILE from './components/Profile/USERPROFILE';
import USERCART from './components/Cart_Page/USERCART';
import UserType from './interfaces/user_interface';
import Fetches from './functions/Fetches';
import Loading from './functions/Loading';
import gif from './images/load.gif'
import BlankPage from './components/Layout/BlankPage';
import SEARCH_RESULT from './components/Searched_Page/SEARCH_RESULT';
import About from './components/Information_Page/About';
import Terms from './components/Information_Page/Terms';
import ORDERDETAILS from './components/Cart_Page/RealiseOrder/OrderDetails';

const LoggedUserContext = React.createContext<UserType | null>(null)
const CartNumberContext = React.createContext<{ numberProducts: number, setNumber: React.Dispatch<React.SetStateAction<number>> } | null>(null)

function App() {
  const [user, setUser] = React.useState<{ user: UserType | null, finished: boolean }>({ user: null, finished: false })
  const [cartNum, setCartNum] = React.useState<number>(0)

  React.useEffect(() => { 
    const init = async () => {
      const l = new Loading(gif, 'loadingDivHeight loadingDivFixed')
      l.appendImage(document.body)

      try {
        const data = await Fetches.mix(process.env.REACT_APP_API_RETURN_CURRENT_USER!, 'GET')

        setUser({
          user: data,
          finished: true
        })

      }catch(err: any) {
        window.location.href = '/error'

      }finally { l.removeImage() }
    }
    init()
  }, [])

  if(user.finished)
  return (
    <div className="App">
      <Router>

        <LoggedUserContext.Provider value={ user.user }>
          <CartNumberContext.Provider value={ { numberProducts: cartNum, setNumber: setCartNum } }>

            <ArrowTop />
            <Nav />
            <NavCategories />

            <Routes>

              <Route path='/' element={ <MAIN_PAGE /> } />
              <Route path='/product/:id' element={ <PRODUCT_PAGE /> } />

              <Route path='/search/:type/:string' element={ <SEARCH_RESULT /> } />
              
              <Route path='/credentials/sign-in' element={ <SIGNIN /> } />
              <Route path='/credentials/register' element={ <REGISTER /> } />

              <Route path='/profile' element={ <USERPROFILE /> } />

              <Route path='/cart' element={ <USERCART /> } />
              <Route path='/cart/order' element={ <ORDERDETAILS /> } />

              <Route path={ process.env.REACT_APP_ROUTE } element={ <PANEL /> } />

              <Route path='/about' element={ <About /> } />

              <Route path='/terms-and-conditions' element={ <Terms /> } />
              
              <Route path='/error' element={ <ERROR_PAGE /> } />

              <Route path='/:pageNr' element={ <MAIN_PAGE /> } />

            </Routes>

            <Footer />

          </CartNumberContext.Provider>
        </LoggedUserContext.Provider>
        
      </Router>
    </div>
  );

  return (
    <BlankPage />
  )
}

export { LoggedUserContext, CartNumberContext }
export default App;
