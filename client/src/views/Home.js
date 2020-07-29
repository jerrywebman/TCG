import React from "react";
// import sections
import Hero from "../components/sections/Hero";
import FeaturesTiles from "../components/sections/FeaturesTiles";
import FeaturesSplit from "../components/sections/FeaturesSplit";
import Testimonial from "../components/sections/Testimonial";
import Cta from "../components/sections/Cta";
import OrderSection from "../components/sections/OrderSection";
import Plan from "../components/sections/Plan";
import AuthModals from "../components/sections/AuthModals";
import Calculator from "../components/sections/Calculator";
const Home = () => {
  return (
    <>
      <Hero className="illustration-section-01" />
      <FeaturesTiles />
      <FeaturesSplit
        invertMobile
        topDivider
        imageFill
        className="illustration-section-02"
      />
      <Plan />
      <Calculator />
      <OrderSection />
      <Testimonial topDivider />
      <Cta split />
      <AuthModals />
    </>
  );
};

export default Home;
