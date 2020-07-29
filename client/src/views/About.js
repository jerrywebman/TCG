import React, { useEffect, useState } from "react";
import Cta from "../components/sections/Cta";
import AuthModals from "../components/sections/AuthModals";
import FeaturesSplit from "../components/sections/FeaturesSplit";
import SectionHeader from "../components/sections/partials/SectionHeader";
import Plan from "../components/sections/Plan";
import Team from "../components/sections/Team";
import firebase from "../components/auth/firebase";
// import Hero from "../components/sections/Hero";

export default function About() {
  const [dataF, setdataF] = useState({});
  const db = firebase.firestore();
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      let docRef = await db
        .collection("dataRef")
        .doc("Ajay")
        .onSnapshot((doc) => {
          if (doc.exists) {
            setdataF(doc.data());
          } else {
            console.log("No such document!");
          }
        });
    };
    fetchData();
  }, []);

  const sectionHeader = {
    title: "About The Coin Growth",
    paragraph:
      " We are a team  dedicated to manage the funds of our clients, while they have total control. We seek to provide top-notch investment solutions to an array of investors who have a broad range of financial requirements including achieving capital growth, capital preservation or a mix of both.",
  };

  const philosophy = {
    title: "Our philosophy",
    paragraph:
      " At The Coin Growth, we are dedicated to ensuring that our clients have an array of options to meet their financial needs, while assuring them of financial fulfillment in the long run. Our business philosophy is premised on providing investment services tailored to meet the needs of investors.",
  };

  const missionVision = {
    title: "Our Mission & Vision",
    paragraph:
      " We are a team, driven to deliver the utmost in customer service. We are synonymous with innovation, building excellence and superior financial performance and creating role models for society.",
  };

  const coreValues = {
    title: "Core Values",
    paragraph:
      "The Coin Growth core values comprise of quality, integrity and resposibility",
  };
  return (
    <>
      <SectionHeader
        data={sectionHeader}
        className="center-content"
        style={{ marginTop: "7em" }}
      />
      {/* //cards section */}
      <div className="container">
        <div className="row mt-3">
          <div className="col-lg-4">
            <div className="card">
              <SectionHeader
                data={philosophy}
                className="center-content"
                style={{
                  padding: "1em",
                  wordSpacing: ".2em",
                  textAlign: "justify",
                }}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <SectionHeader
                data={missionVision}
                className="center-content"
                style={{
                  padding: "1em",
                  wordSpacing: ".2em",
                  textAlign: "justify",
                }}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <SectionHeader
                data={coreValues}
                className="center-content"
                style={{
                  padding: "1em",
                  wordSpacing: ".2em",
                  textAlign: "justify",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Team />
      <FeaturesSplit />

      <Plan />
      <div className="container">
        <div className="card p-1">
          <div className="row">
            <div className="col-4">
              <h3>Who We Are</h3>
              <h5 className="text-muted">Total accounts</h5>
              <h5 className="text-muted">Total deposited</h5>
              <h5 className="text-muted">Total Withdrawal</h5>
              <h5 className="text-muted">Last Update</h5>
            </div>
            <div className="col-4">
              <h3>-</h3>
              <h5> {dataF.totAcc}</h5>
              <h5>$ {dataF.totDepo}</h5>
              <h5>$ {dataF.totWith}</h5>
              <h5>{dataF.updat}</h5>
            </div>
            <div className="col-4">
              <img
                src={require("../assets/images/cert.jpeg")}
                alt="The Coin Growth Certificate of Inc"
              />
            </div>
          </div>
        </div>
      </div>
      <AuthModals />
      <Cta split />
    </>
  );
}
