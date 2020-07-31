import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";
import { AuthContext } from "../../context/Auth";
import { useHistory, Link } from "react-router-dom";
import * as emailjs from "emailjs-com";
import axios from "axios";
import MailModal from "../../sections/MailModal";

import AllModalForm from "../AdminComponents/AllModalForm";

export default function SpecialFunctions() {
  const { currentUser, pending } = useContext(AuthContext);

  const [data, setData] = useState({});
  //PACKAGE FORM STATES

  const [btcAddress, setBtcAddress] = useState("");
  const [moreInfo, setMoreInfo] = useState({});
  const [tcgWallet, setTcgWallet] = useState({});

  //PACKAGE FORM STATES
  const [packageName, setPackageName] = useState("");
  const [packageMinAmount, setPackageMinAmount] = useState("");
  const [packageMaxAmount, setPackageMaxAmount] = useState("");
  const [profit, setProfit] = useState("");
  const [duration, setDuration] = useState("");

  const [email, setEmail] = useState("");

  const [clientBtcAddress, setClientBtcAddress] = useState("");
  const [clientEthAddress, setClientEthAddress] = useState("");
  const [clientLtcAddress, setClientLtcAddress] = useState("");
  const [clientDogeAddress, setClientDogeAddress] = useState("");
  const [clientPerfectAddress, setClientPerfectAddress] = useState("");
  const [clientPayeerAddress, setClientPayeerAddress] = useState("");

  const [balance, setBalance] = useState(0);

  //USER TRANSACTION DATA
  const [trxnAmount, setTrxnAmount] = useState("");
  const [trxnCategory, setTrxnCategory] = useState("");
  const [trxnId, setTrxnId] = useState("");
  const [trxnStatus, setTrxnStatus] = useState("");
  const [trxnDate, setTrxnDate] = useState("");
  const [trxnEmail, setTrxnEmail] = useState("");

  //USER PACKAGE DATA
  const [amountInvestment, setAmountInvestment] = useState("");
  const [percentage, setPercentage] = useState("");
  const [maturityDate, setMaturityDate] = useState("");

  //FAKE DATA
  const [totAcc, setTotAcc] = useState("");
  const [totDepo, setTotDepo] = useState("");
  const [updat, setUpdat] = useState("");
  const [totWith, setTotwith] = useState("");

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

  //POST DATA
  //FUND USER
  const onCreateData = () => {
    db.collection("dataRef")
      .doc("Ajay")
      .set({
        totAcc,
        totDepo,
        updat,
        totWith,
      })
      .then(() => {
        alert("user data updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //FUND USER
  const onFund = () => {
    const fund = Number(balance);
    db.collection("related")
      .doc(email)
      .update({
        balance: fund,
      })
      .then(() => {
        alert("user data updated");
        // //adding to transaction file in an array of objects
        // db.collection("transaction")
        //   .doc(email)
        //   .update({
        //     trxn: firebase.firestore.FieldValue.arrayUnion({
        //       amount: balance,
        //       category: "Account Credit",
        //       date: new Date(),
        //       trxnId: "",
        //       status: "Completed",
        //     }),
        //   })
        //   .catch((err) => {
        //     alert(err);
        //   });
        //ADDING TO TRANSACTION DATA
        const newDate = new Date();
        const jsonDate = JSON.stringify(newDate);
        console.log(jsonDate);
        const fund = Number(balance);
        db.collection("transaction")
          .doc(email)
          .update({
            email: email,
            amount: fund,
            category: "Account Credit",
            date: jsonDate,
            trxnId: "",
            status: "Completed",
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //ADD FUND TO USER
  const onAddFund = () => {
    //convert to number
    const fund = Number(balance);
    //increment
    const increase = firebase.firestore.FieldValue.increment(fund);
    db.collection("related")
      .doc(email)
      .update({
        balance: increase,
      })
      .then(() => {
        alert("user balance updated ");
        //ADDING TO TRANSACTION DATA
        const newDate = new Date();
        const jsonDate = JSON.stringify(newDate);
        console.log(jsonDate);
        db.collection("transaction")
          .doc(email)
          .update({
            email: email,
            amount: balance,
            category: "Account Credit",
            date: jsonDate,
            trxnId: "",
            status: "Completed",
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //MINUS FUND TO USER
  const onMinusFund = () => {
    //convert to number
    const fund = Number(balance);
    //decrement
    const increase = firebase.firestore.FieldValue.increment(fund);
    db.collection("related")
      .doc(email)
      .update({
        balance: increase,
      })
      .then(() => {
        alert("user balance updated ");
        //ADDING TO TRANSACTION DATA
        const newDate = new Date();
        const jsonDate = JSON.stringify(newDate);
        console.log(jsonDate);
        db.collection("transaction")
          .doc(email)
          .update({
            email: email,
            amount: balance,
            category: "Account Debit",
            date: jsonDate,
            trxnId: "",
            status: "Completed",
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //ADD USER PACKAGE
  const onFundPackage = () => {
    const newDate = new Date();
    const jsonDate = JSON.stringify(newDate);

    db.collection("related")
      .doc(email)
      .set({
        packageName,
        amountInvestment,
        percentage,
        maturityDate,
        investDate: jsonDate,
      })
      .then(() => {
        alert("user Package updated");

        db.collection("transaction")
          .doc(email)
          .update({
            email: email,
            amount: amountInvestment,
            category: "Package Activation",
            date: jsonDate,
            trxnId: "",
            status: "Completed",
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //ADD TRANSACTION DATA
  const onCreateTrxn = () => {
    db.collection("transaction")
      .doc(trxnEmail)
      .update({
        email: trxnEmail,
        amount: trxnAmount,
        category: trxnCategory,
        date: trxnDate,
        trxnId: trxnId,
        status: trxnStatus,
      })
      .then(() => {
        alert("Transaction Data Added");
      })
      .catch((err) => {
        alert(err);
      });
  };

  // CREATE NEW PACKAGE
  const newDate = new Date();
  const jsonDate = JSON.stringify(newDate);
  const onCreatePackage = () => {
    const db = firebase.firestore();
    db.collection("package")
      .add({
        packageName,
        packageMinAmount,
        packageMaxAmount,
        profit,
        duration,
        createdAt: jsonDate,
      })
      .then(() => {
        alert("Package Added");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //CREATE ADMIN
  const onCreateAdmin = () => {
    const functions = firebase.functions();
    const addAdminRole = functions.httpsCallable("addAdminRole");
    addAdminRole({ email }).then((result) => {
      console.log(result);
    });
  };

  //UPDATE BTC ADDRESS
  const onUpdateBtcAddress = () => {
    db.collection("related")
      .doc(email)
      .update({
        btcAddress: clientBtcAddress,
      })
      .then(() => {
        alert("user Address updated");

        emailjs.sendForm(
          "gmail",
          "transaction_email",
          ".btc-wallet-address",
          "user_WSEuxDi2XppgmyUaLBK1D"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //UPDATE ETH ADDRESS
  const onUpdateEthAddress = () => {
    db.collection("related")
      .doc(email)
      .update({
        ethAddress: clientEthAddress,
      })
      .then(() => {
        alert("user Eth Address updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //UPDATE LTC ADDRESS
  const onUpdateLtcAddress = () => {
    db.collection("related")
      .doc(email)
      .update({
        ltcAddress: clientLtcAddress,
      })
      .then(() => {
        alert("user Litecoin Address updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //UPDATE  DOGE  ADDRESS
  const onUpdateDogeAddress = () => {
    db.collection("related")
      .doc(email)
      .update({
        dogeAddress: clientDogeAddress,
      })
      .then(() => {
        alert("user Doge Address updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //UPDATE  PERFECT  ADDRESS
  const onUpdatePerfectAddress = () => {
    db.collection("related")
      .doc(email)
      .update({
        perfectAddress: clientPerfectAddress,
      })
      .then(() => {
        alert("user Perfect Money Address updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //UPDATE  PAYEER  ADDRESS
  const onUpdatePayeerAddress = () => {
    db.collection("related")
      .doc(email)
      .update({
        payeerAddress: clientPayeerAddress,
      })
      .then(() => {
        alert("user Payeer Address updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div style={{ marginTop: "3em" }}>
        <div className="page-wrapper">
          <div className="page-wrapper-inner"></div>
          <div className="row mb-2">
            <div className="card-body mb-0"></div>
          </div>
          <div></div>

          <div className="row mt-4 mb-4"></div>
          <div className="page-content mt-3">
            <div className="container-fluid">
              <div className="row">
                <div className="container">
                  {/* ADMIN FUNCTIONS */}
                  <div>
                    <h3 className="mb-3">Admin Special Functions</h3>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="card overflow-hidden">
                        <div className="card-body bg-gradient1">
                          <div className="">
                            <div className="card-icon">
                              <i className="far fa-user"></i>
                            </div>
                            <h2 className="font-weight-bold text-white">
                              Manage User Account
                            </h2>
                          </div>
                        </div>
                        <div className="card-body dash-info-carousel">
                          <div className="row">
                            <div className="col-6 align-self-center text-center">
                              <button
                                className="btn btn-sm btn-success"
                                data-toggle="modal"
                                data-target="#wallet-balance"
                              >
                                Fund New User Account
                              </button>
                            </div>
                            <div className="col-6 align-self-center text-center">
                              <button
                                className="btn btn-sm btn-warning"
                                data-toggle="modal"
                                data-target="#btc-wallet-address"
                              >
                                Edit Btc Address
                              </button>
                            </div>
                          </div>

                          <div className="card-body dash-info-carousel"></div>
                          <div className="row">
                            <div className="col-6 align-self-center text-center">
                              <button
                                className="btn btn-sm btn-success"
                                data-toggle="modal"
                                data-target="#add-balance"
                              >
                                Add Fund To Existing User Account
                              </button>
                            </div>
                            <div className="col-6 align-self-center text-center">
                              <button
                                className="btn btn-sm btn-warning"
                                data-toggle="modal"
                                data-target="#minus-fund"
                              >
                                Minus Fund From Existing User Account
                              </button>
                            </div>
                          </div>
                          <div className="card-body dash-info-carousel">
                            <div className="row">
                              <div className="col-6 align-self-center text-center">
                                <button
                                  className="btn btn-sm btn-info"
                                  data-toggle="modal"
                                  data-target="#eth-wallet-address"
                                >
                                  Edit Eth Address
                                </button>
                              </div>
                              <div className="col-6 align-self-center text-center">
                                <button
                                  className="btn btn-sm btn-success"
                                  className="btn btn-sm btn-info"
                                  data-toggle="modal"
                                  data-target="#transaction-data"
                                >
                                  Add Trxn Data
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="card-body dash-info-carousel">
                            <div className="row">
                              <div className="col-6 align-self-center text-center">
                                <button
                                  className="btn btn-sm btn-info"
                                  data-toggle="modal"
                                  data-target="#ltc-wallet-address"
                                >
                                  Edit LTC Address
                                </button>
                              </div>
                              <div className="col-6 align-self-center text-center">
                                <button
                                  className="btn btn-sm btn-success"
                                  className="btn btn-sm btn-info"
                                  data-toggle="modal"
                                  data-target="#doge-wallet-address"
                                >
                                  Edit DOGE Address
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="card-body dash-info-carousel">
                            <div className="row">
                              <div className="col-6 align-self-center text-center">
                                <button
                                  className="btn btn-sm btn-info"
                                  data-toggle="modal"
                                  data-target="#perfect-wallet-address"
                                >
                                  Edit Perfect Address
                                </button>
                              </div>
                              <div className="col-6 align-self-center text-center">
                                <button
                                  className="btn btn-sm btn-success"
                                  className="btn btn-sm btn-info"
                                  data-toggle="modal"
                                  data-target="#payeer-wallet-address"
                                >
                                  Edit Payeer Address
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="card overflow-hidden">
                        <div className="card-body bg-gradient3">
                          <div className="">
                            <div className="card-icon">
                              <i className="far fa-smile"></i>
                            </div>
                            <h2 className="font-weight-bold text-white">
                              Manage Company Transaction
                            </h2>
                          </div>
                        </div>
                        <div className="card-body dash-info-carousel">
                          <div className="row m-3">
                            <div className="col-12 align-self-center text-center">
                              <button
                                className="btn btn-sm btn-warning"
                                data-toggle="modal"
                                data-target="#add-user-package"
                              >
                                Add User Pack
                              </button>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 align-self-center text-center mb-3">
                              <button
                                className="btn btn-sm btn-info"
                                data-toggle="modal"
                                data-target="#add-Investment-package"
                              >
                                Add Investment Pack
                              </button>
                            </div>
                          </div>

                          <div className="row m-3">
                            <div className="col-12 align-self-center text-center">
                              <button
                                className="btn btn-sm btn-warning"
                                data-toggle="modal"
                                data-target="#add-who"
                              >
                                Edit Who We Are Data
                              </button>
                            </div>
                            <div className="row m-3">
                              <div className="col-12 align-self-center text-center">
                                <button
                                  className="btn btn-sm btn-success"
                                  data-toggle="modal"
                                  data-target="#email-modal"
                                  onClick={() => {}}
                                >
                                  Send User Email
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card overflow-hidden">
                        <div className="card-body bg-gradient2">
                          <div className="">
                            <div className="card-icon">
                              <i className="fas fa-coins"></i>
                            </div>
                            <h2 className="font-weight-bold text-white">
                              Users Restrictions
                            </h2>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-6 align-self-center text-center">
                              <button className="btn btn-sm btn-danger">
                                Delete User
                              </button>
                            </div>

                            <div className="col-6 align-self-center text-center">
                              <button className="btn btn-sm btn-warning">
                                Ban User
                              </button>
                            </div>
                          </div>
                          {/* Add Admin */}
                          <div className="card-body">
                            <div className="row">
                              <div className="col-12 align-self-center text-center">
                                <button
                                  className="btn btn-sm btn-info"
                                  data-toggle="modal"
                                  data-target="#add-admin"
                                >
                                  Add Admin
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <MailModal />
                <AllModalForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
