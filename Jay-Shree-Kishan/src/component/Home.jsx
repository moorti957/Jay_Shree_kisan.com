import React, { useEffect, useState } from 'react'
import BlogSection from './BlogSection'
import Banner from './banner/Banner'
import { FaArrowUp } from "react-icons/fa";

import Search from './Searchbar/Search'


import Features from './category/Category'
import ProductList from './CategoryData/ProductList'


import AboutKisanDeals from './AboutKisanDeals/AboutKisanDeals'

import AIChatProPlus from './LeftSideChat/AIChatProPlus';


const Home = () => {
  
  const [showScroll, setShowScroll] = useState(false);


  useEffect(() => {
      const checkScrollTop = () => {
        if (!showScroll && window.scrollY > 300) {
          setShowScroll(true);
        } else if (showScroll && window.scrollY <= 300) {
          setShowScroll(false);
        }
      };
      window.addEventListener("scroll", checkScrollTop);
      return () => window.removeEventListener("scroll", checkScrollTop);
    }, [showScroll]);

    const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  
  
  return (
    <div>




      <Features />
      {/* <Search /> */}

      <ProductList />

      <Banner />
      <BlogSection />
      <AboutKisanDeals />
      {/* <LeftSideChat/> */}
      {/* <AIChatWidget/> */}
      {/* <AIChatLive/> */}
      {/* <AIChatPro/> */}
      <AIChatProPlus/>




           {showScroll && (
                 <button className="scrollTop" onClick={scrollToTop}>
                   <FaArrowUp />
                 </button>
               )}
    </div>
  )
}

export default Home
