import React from "react";
import "./Banner.css";
import { assets } from "../../assets/assets";

const Banner = () => {
  return (
    <>



      {/* 🔹 Banner Section */}
      <div className="container12">
        <div className="banner12">
          <img src={assets.banner} alt="banner" />
          <div className="content12">
            <div className="left12">Super Discount For Your First Purchase.</div>
            <div className="center12">
              <button>Free Offer</button>
            </div>
            <div className="right12">Use discount code in check out !</div>
          </div>
        </div>
      </div>




      {/* 🔹 Cards Section */}
      <div className="cards-container123">
        <div className="card123">
          <div className="bg-image123">
            <img src={assets.banner1} alt="" />
          </div>
          <div className="overlay123"></div>
          <div className="content123">
            <p className="subtitle123">Weekend Discount 40 %</p>
            <h2 className="title123">
              Everything Is So <br /> Fresh & Delicious
            </h2>
            <p className="text123">Eat one every day</p>
            <button className="btn123">Shop Now</button>
          </div>
        </div>






        <div className="card123">
          <div className="bg-imag123">
            <img src={assets.banner2} alt="" />
          </div>
          <div className="overlay123"></div>
          <div className="content123">
            <p className="subtitle123">Weekend Discount 40 %</p>
            <h2 className="title123">
              Everything Is So <br /> Fresh & Delicious
            </h2>
            <p className="text123">Eat one every day</p>
            <button className="btn123">Shop Now</button>
          </div>
        </div>

        <div className="card123">
          <div className="bg-ima123">
            <img src={assets.banner3} alt="" />
          </div>
          <div className="overlay123"></div>
          <div className="content123">
            <p className="subtitle123">Weekend Discount 40 %</p>
            <h2 className="title123">
              Everything Is So <br /> Fresh & Delicious
            </h2>
            <p className="text123">Eat one every day</p>
            <button className="btn123">Shop Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
