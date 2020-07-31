import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";
import { AuthContext } from "../../context/Auth";
import { useHistory, Link } from "react-router-dom";
import Image from "../../elements/Image";

export default function AccountInfo() {
  const { currentUser, pending } = useContext(AuthContext);

  const [data, setData] = useState({});
  //PACKAGE FROM STATES
  const [tcgWallet, setTcgWallet] = useState({});
  const [btcAddress, setBtcAddress] = useState("");
  const [moreInfo, setMoreInfo] = useState({});

  const db = firebase.firestore();
  const history = useHistory();

  useEffect(() => {
    const fetchMoreUserInfo = async () => {
      let docRef = await db
        .collection("related")
        .doc(currentUser.email)
        .onSnapshot((doc) => {
          if (doc.exists) {
            setMoreInfo(doc.data());
          } else {
            console.log("No such document!");
          }
        });
    };

    //GET COMPANY WALLET
    const fetchTcgWallet = async () => {
      let docRef = await db
        .collection("companyWallet")
        .doc("wuMvwGLVSiTZTwT3zmOR")
        .onSnapshot((doc) => {
          if (doc.exists) {
            setTcgWallet(doc.data());
          } else {
            console.log("No such document!");
          }
        });
    };

    //GET USER DATA
    const fetchUser = async () => {
      let docref = await db
        .collection("users")
        .doc(currentUser.uid)
        .onSnapshot((doc) => {
          if (doc.exists) {
            setData(doc.data());
          } else {
            console.log("No such document!");
          }
        });
    };

    fetchUser();
    fetchTcgWallet();
    fetchMoreUserInfo();
  }, [currentUser, pending]);

  return (
    <div>
      <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body mb-0">
              <div className="row">
                <div className="col-12 align-self-center">
                  <div className="">
                    <h4 className="mt-0 header-title">Account Information</h4>
                    <hr></hr>
                    <h4 className="mt-0 header-title">
                      Email: {currentUser.email}
                    </h4>
                    <hr></hr>

                    <h4 className="mt-0 header-title">
                      Username : {data.username}
                    </h4>
                    <hr></hr>
                    <h4 className="mt-0 header-title">
                      Fullname : {data.name}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body mb-0">
              <div className="row">
                <div className="col-8 align-self-center">
                  <div className="">
                    <h4 className="mt-0 header-title">Account Balance</h4>
                    <h2 className="mt-0 font-weight-bold">
                      $<span>{moreInfo.balance}</span>
                    </h2>
                  </div>
                </div>
                <div className="col-4 align-self-center">
                  <div className="icon-info text-right">
                    <i className="dripicons-wallet bg-soft-success"></i>
                  </div>
                </div>
                {/* <Link
                          style={{ marginTop: "1em", marginBottom: "1em" }}
                          data-toggle="modal"
                          data-target="#signup-form"
                          className="button button-primary button-wide-mobile button-sm"
                        >
                          Fund My Account
                        </Link> */}
              </div>
            </div>
            <div className="card-body overflow-hidden p-0">
              <div className="d-flex mb-0 h-100 dash-info-box">
                <div className="w-100">
                  <div className="apexchart-wrapper">
                    <div id="apex_column1" className="chart-gutters"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card carousel-bg-img">
            <div className="card-body dash-info-carousel mb-0">
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="row">
                      <div className="col-12 align-self-center">
                        <div className="text-center">
                          <h4 className="mt-0 header-title text-left">
                            {moreInfo.packageName} Package
                          </h4>
                          <div className="icon-info my-3">
                            <i className="dripicons-jewel bg-soft-pink"></i>
                          </div>
                          <h2 className="mt-0 font-weight-bold">
                            ${moreInfo.amountInvestment}
                          </h2>

                          <p>Percentage(%): {moreInfo.percentage} </p>
                          <p>Date activated:{moreInfo.investDate} </p>
                          <p>Maturity date: {moreInfo.maturityDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <div className="row">
                      <div className="col-12 align-self-center">
                        <div className="text-center">
                          <h4 className="mt-0 header-title text-left">
                            Your Wallet Address
                          </h4>
                          <div className="icon-info my-3">
                            <i className="dripicons-store bg-soft-warning"></i>
                          </div>
                          <hr></hr>
                          <h6 className="mb-1 text-muted">
                            Btc: {moreInfo.btcAddress}
                          </h6>
                          <hr></hr>
                          <h6 className="mb-1 text-muted">
                            Eth: {moreInfo.ethAddress}
                          </h6>
                          <hr></hr>
                          <h6 className="mb-1 text-muted">
                            Ltc: {moreInfo.ethAddress}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <div className="row">
                      <div className="col-12 align-self-center">
                        <div className="text-center">
                          <h4 className="mt-0 header-title text-left">
                            THE COIN GROWTH
                            <br /> WALLET ADDRESS
                          </h4>
                          <div className="icon-info my-3">
                            <Image
                              src={require("../../../assets/images/favicon.svg")}
                              alt="Open"
                              width={30}
                              height={30}
                              style={{
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto",
                              }}
                            />
                          </div>
                          <hr></hr>
                          <h6 className="mb-1 text-muted">
                            BTC: {tcgWallet.btc}
                          </h6>
                          <hr></hr>
                          <h6 className="mb-1 text-muted">
                            PAYEER: {tcgWallet.payeer}
                          </h6>
                          <hr></hr>
                          <h6 className="mb-1 text-muted">
                            ETH: {tcgWallet.eth}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <div className="row">
                      <div className="col-12 align-self-center">
                        <div className="text-center">
                          <h4 className="mt-0 header-title text-left">
                            THE COIN GROWTH
                            <br /> WALLET ADDRESS
                          </h4>
                          <div className="icon-info my-3">
                            {/* <i className="dripicons-basket bg-soft-info"></i> */}
                            <Image
                              src={require("../../../assets/images/favicon.svg")}
                              alt="Open"
                              width={30}
                              height={30}
                              style={{
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto",
                              }}
                            />
                          </div>
                          <hr></hr>
                          <h6 className="mb-1 text-muted">
                            DOGE: {tcgWallet.doge}
                          </h6>
                          <hr></hr>
                          <h6 className="mb-1 text-muted">
                            PERFECT MONEY: {tcgWallet.perfect}
                          </h6>
                          <hr></hr>
                          <h6 className="mb-1 text-muted">
                            LTH: {tcgWallet.ltc}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
