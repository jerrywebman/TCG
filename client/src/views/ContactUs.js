import React, { useEffect } from "react";
import SectionHeader from "../components/sections/partials/SectionHeader";
import ContactTiles from "../components/sections/ContactTiles";
import AuthModals from "../components/sections/AuthModals";

export default function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionHeader = {
    title: "Contact Us",
    paragraph: "Our Support Agents Are Online 24/7",
  };
  return (
    <div>
      <SectionHeader
        data={sectionHeader}
        className="center-content"
        style={{ marginTop: "7em" }}
      />
      <ContactTiles />
      <AuthModals />
    </div>
  );
}
