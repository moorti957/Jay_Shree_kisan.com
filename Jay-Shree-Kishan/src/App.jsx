import React, { useEffect, useState } from 'react'
import Products from './component/Products'
import Home from './component/Home'
import { Route, Routes } from 'react-router-dom'
import Navbar from './component/Navber/Navber'
import MenuBar from './component/MenuBar/MenuBar'
import Footer from './component/Footer/Footer'
import Contact from './pages/Contact/Contact'
import ProductPage from './component/ProductPage/ProductPage'
import PopupModal from './component/PopupModal/PopupModal'
import AccountPage from './component/AccountPage/SignIn'
import BrandPage from './component/brand/BrandPage'
import SiteMap from './component/sitemap/SiteMap'
import Special from './component/special/Special'
import TrendingPrices from './component/CategoryData/TrendingPrices'
import BuySellForm from './component/CategoryData/BuySellForm'
import MarketTable from './component/CategoryData/MarketTable'
import CategoryPage from './component/CategoryData/Categories'
import EggRateTable from './component/CategoryData/EggRateTable'
import SignUp from './component/AccountPage/SingUp'
import { UserProvider } from './component/UserContext'
import Payment from './payment'
import LoadingPage from './component/LoadingPage/LoadingPage'
import MyProducts from './component/CategoryData/MyProducts'
import ProductList from './component/CategoryData/ProductList'
import ProductDetail from './component/CategoryData/ProductDetail'
import CategoryProducts from './component/CategoryProducts'
import DownloadAppSection from './component/DownloadAppSection/DownloadAppSection'
import CommentModal from './component/CommentModal/CommentModal'
import MyAccount from './component/AccountPage/MyAccount'
import FestivalGiftOffers from './component/FestivalGiftOffers/FestivalGiftOffers'


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <UserProvider  basename="/admin">
        <Navbar />
        <MenuBar />
        <PopupModal />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/productpage' element={<ProductPage />} />
          <Route path='/brandPage' element={<BrandPage />} />
          <Route path='/special' element={<Special />} />
          <Route path='/signIn' element={<AccountPage />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/siteMap' element={<SiteMap />} />
          <Route path='/trendingPrices' element={<TrendingPrices />} />
          <Route path='/mandiprice' element={<EggRateTable />} />
          <Route path='/buySellForm' element={<BuySellForm />} />
          <Route path='/marketTable' element={<MarketTable />} />
          <Route path='/categoryPage' element={<CategoryPage />} />
          <Route path='/eggRateTable' element={<EggRateTable />} />
          <Route path='/payment' element={<Payment />} />
          <Route path="/my-products" element={<MyProducts />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/category/:category" element={<CategoryProducts />} />
          <Route path="/download-app" element={<DownloadAppSection />} />
          <Route path="/comments" element={<CommentModal />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/festival" element={<FestivalGiftOffers/>} />


        </Routes>

        <Footer />
      </UserProvider>
    </div>
  )
}

export default App
