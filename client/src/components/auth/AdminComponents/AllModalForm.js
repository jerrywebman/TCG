import React, { useState, useContext, useEffect } from "react";

import firebase from "../firebase";
import { AuthContext } from "../../context/Auth";
import { useHistory, Link } from "react-router-dom";

export default function AllModalForm() {
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
    // const fetchMoreUserInfo = async () => {
    //   let docRef = await db
    //     .collection("related")
    //     .doc(currentUser.email)
    //     .onSnapshot((doc) => {
    //       if (doc.exists) {
    //         setMoreInfo(doc.data());
    //       } else {
    //         console.log("No such document!");
    //       }
    //     });
    // };
    // //GET COMPANY WALLET
    // const fetchTcgWallet = async () => {
    //   let docRef = await db
    //     .collection("companyWallet")
    //     .doc("wuMvwGLVSiTZTwT3zmOR")
    //     .onSnapshot((doc) => {
    //       if (doc.exists) {
    //         setTcgWallet(doc.data());
    //       } else {
    //         console.log("No such document!");
    //       }
    //     });
    // };
    // //GET USER DATA
    // const fetchUser = async () => {
    //   let docref = await db
    //     .collection("users")
    //     .doc(currentUser.uid)
    //     .onSnapshot((doc) => {
    //       if (doc.exists) {
    //         setData(doc.data());
    //       } else {
    //         console.log("No such document!");
    //       }
    //     });
    // };
    // fetchUser();
    // fetchTcgWallet();
    // fetchMoreUserInfo();
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
    db.collection("completedTrxn")
      .add({
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

        // emailjs.sendForm(
        //   "gmail",
        //   "transaction_email",
        //   ".btc-wallet-address",
        //   "user_WSEuxDi2XppgmyUaLBK1D"
        // );
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
      {/* <!-- MODAL WALLET BALANCE -->
                    <!-- Button trigger modal -->
                                                
                        <!-- Modal --> */}
      <div
        className="modal fade"
        id="wallet-balance"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        data-backdrop="false"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Fund User Wallet
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="col-12 mb-3">
                <label for="">Email Address</label>
                <input
                  type="Email"
                  className="form-control"
                  id=""
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="col-12 mb-3">
                <label for="validationCustom02">Amount in $</label>
                <input
                  type="number"
                  className="form-control"
                  id="validationCustom02"
                  placeholder="Amount in Dollar"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={onFund}
              >
                Fund
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- ADD FUND MODAL WALLET BALANCE -->
                    <!-- Button trigger modal -->
                                                
                        <!-- Modal --> */}
      <div
        className="modal fade"
        id="add-balance"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        data-backdrop="false"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Add Fund User Wallet
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="col-12 mb-3">
                <label for="">Email Address</label>
                <input
                  type="Email"
                  className="form-control"
                  id=""
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 mb-3">
                <label for="validationCustom02">Amount to Add in $</label>
                <input
                  type="number"
                  className="form-control"
                  id="validationCustom02"
                  placeholder="Amount in Dollar"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={onAddFund}
              >
                Add Fund
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Minus FUND MODAL WALLET BALANCE -->
                    <!-- Button trigger modal -->
                                                
                        <!-- Modal --> */}
      <div
        className="modal fade"
        id="minus-fund"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        data-backdrop="false"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Minus Fund From User Wallet
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="col-12 mb-3">
                <label for="">Email Address</label>
                <input
                  type="Email"
                  className="form-control"
                  id=""
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 mb-3">
                <label for="validationCustom02">Amount to Minus in $</label>
                <input
                  type="number"
                  className="form-control"
                  id="validationCustom02"
                  placeholder="Amount in Dollar"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={onMinusFund}
              >
                Minus Fund
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- EDIT BTC WALLET ADDRESS -->
                    <!-- Button trigger modal -->
                                                
                        <!-- Modal --> */}
      <form onSubmit={handleSubmit} className="btc-wallet-address">
        <div
          className="modal fade"
          id="btc-wallet-address"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Edit client BTC Wallet
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="col-12 mb-3">
                  <label for="clientemail">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="clientemail"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    requireed
                  />
                </div>
                <div className="col-12 mb-3">
                  <label for="validationCustom02">New Address BTC</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom02"
                    placeholder="BTC Address"
                    value={clientBtcAddress}
                    onChange={(e) => setClientBtcAddress(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={onUpdateBtcAddress}
                >
                  Add Address
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* <!-- EDIT ETH WALLET ADDRESS -->
                    <!-- Button trigger modal -->
                                                
                        <!-- Modal --> */}
      <form onSubmit={handleSubmit}>
        <div
          className="modal fade"
          id="eth-wallet-address"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Edit client ETH Wallet
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="col-12 mb-3">
                  <label for="clientemail">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="clientemail"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    requireed
                  />
                </div>
                <div className="col-12 mb-3">
                  <label for="validationCustom02">New Address ETH</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom02"
                    placeholder="ETH Address"
                    value={clientEthAddress}
                    onChange={(e) => setClientEthAddress(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={onUpdateEthAddress}
                >
                  Add Address
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* <!-- EDIT LTC WALLET ADDRESS -->
                    <!-- Button trigger modal -->
                                                
                        <!-- Modal --> */}
      <form onSubmit={handleSubmit}>
        <div
          className="modal fade"
          id="ltc-wallet-address"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Edit client LTC Wallet
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="col-12 mb-3">
                  <label for="clientemail">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="clientemail"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    requireed
                  />
                </div>
                <div className="col-12 mb-3">
                  <label for="validationCustom02">New Address LTC</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom02"
                    placeholder="LTC Address"
                    value={clientLtcAddress}
                    onChange={(e) => setClientLtcAddress(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={onUpdateLtcAddress}
                >
                  Add Address
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* <!-- EDIT DOGE WALLET ADDRESS -->
                    <!-- Button trigger modal -->
                                                
                        <!-- Modal --> */}
      <form onSubmit={handleSubmit}>
        <div
          className="modal fade"
          id="doge-wallet-address"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Edit client DOGE Wallet
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="col-12 mb-3">
                  <label for="clientemail">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="clientemail"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    requireed
                  />
                </div>
                <div className="col-12 mb-3">
                  <label for="validationCustom02">New Address DOGE</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom02"
                    placeholder="DOGE Address"
                    value={clientDogeAddress}
                    onChange={(e) => setClientDogeAddress(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={onUpdateDogeAddress}
                >
                  Add Address
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* <!-- EDIT PERFECT WALLET ADDRESS -->
                    <!-- Button trigger modal -->
                                                
                        <!-- Modal --> */}
      <form onSubmit={handleSubmit}>
        <div
          className="modal fade"
          id="perfect-wallet-address"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Edit client PERFECT MONEY Wallet
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="col-12 mb-3">
                  <label for="clientemail">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="clientemail"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    requireed
                  />
                </div>
                <div className="col-12 mb-3">
                  <label for="validationCustom02">
                    New Address PERFECT MONEY
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom02"
                    placeholder="PERFECT Address"
                    value={clientPerfectAddress}
                    onChange={(e) => setClientPerfectAddress(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={onUpdatePerfectAddress}
                >
                  Add Address
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* <!-- EDIT PAYEER WALLET ADDRESS -->
                    <!-- Button trigger modal -->
                                                
                        <!-- Modal --> */}
      <form onSubmit={handleSubmit}>
        <div
          className="modal fade"
          id="payeer-wallet-address"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Edit client PAYEER Wallet
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="col-12 mb-3">
                  <label for="clientemail"> Email Address </label>
                  <input
                    type="email"
                    className="form-control"
                    id="clientemail"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    requireed
                  />
                </div>
                <div className="col-12 mb-3">
                  <label for="validationCustom02">New Address LTC</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom02"
                    placeholder="PAYEER Address"
                    value={clientPayeerAddress}
                    onChange={(e) => setClientPayeerAddress(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={onUpdatePayeerAddress}
                >
                  Add Address
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* ADD USER PACKAGE
                    < Button trigger modal                                                 
                    Modal  */}
      <form onSubmit={handleSubmit}>
        <div
          className="modal fade"
          id="add-who"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Add Data
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="col-12 mb-3">
                  <label>Total Accounts</label>
                  <input
                    type="text"
                    className="form-control"
                    value={totAcc}
                    onChange={(e) => setTotAcc(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label>Total Deposited</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Package Name "
                    value={totDepo}
                    onChange={(e) => setTotDepo(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label>Total Withdrawn</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Amount invested "
                    value={totWith}
                    onChange={(e) => setTotwith(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label>Last Updated</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="percentage"
                    value={updat}
                    onChange={(e) => setUpdat(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={onCreateData}
                  data-dismiss="modal"
                >
                  post
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* ADD USER PACKAGE
                    < Button trigger modal                                                 
                    Modal  */}
      <form onSubmit={handleSubmit}>
        <div
          className="modal fade"
          id="add-user-package"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Add User Selected Package
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="col-12 mb-3">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label>Package Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Package Name "
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label> Amount invested in dollar</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Amount invested "
                    value={amountInvestment}
                    onChange={(e) => setAmountInvestment(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label>Percentage</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="percentage"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label>Maturity Date (2 July, 2020)</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Package Profit"
                    value={maturityDate}
                    onChange={(e) => setMaturityDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={onFundPackage}
                >
                  Add Fund to User Package
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* ADD INVESTMENT PACKAGE
                    < Button trigger modal                                                 
                    Modal  */}
      <form onSubmit={handleSubmit}>
        <div
          className="modal fade"
          id="add-Investment-package"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Add New Package
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="col-12 mb-3">
                  <label>Package Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Package Name"
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-12 mb-3">
                  <label>Package Min Amount in dollar</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Package Minimum Amount"
                    value={packageMinAmount}
                    onChange={(e) => setPackageMinAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label>Package Max Amount in dollar</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Package Maximum Amount"
                    value={packageMaxAmount}
                    onChange={(e) => setPackageMaxAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label>Profit</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Package Profit"
                    value={profit}
                    onChange={(e) => setProfit(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label>Duration</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={onCreatePackage}
                >
                  Add Package
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* /* <!-- MODAL WALLET BALANCE -->
                    <!-- Button trigger modal -->
                                                
                        <!-- Modal --> */}{" "}
      {/* /* <!-- ADD TRANSCTION DATA -->
                    <!-- Button trigger modal -->
                                                
                        <!-- Modal --> */}{" "}
      <form onSubmit={handleSubmit}>
        <div
          className="modal fade"
          id="transaction-data"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Add User Transaction data
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="col-12 mb-3">
                  <label for="validationCustom01">Email Address</label>
                  <input
                    type="Email"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="Email"
                    value={trxnEmail}
                    onChange={(e) => setTrxnEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label for="validationCustom02">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="validationCustom02"
                    placeholder="Enter Date"
                    value={trxnDate}
                    onChange={(e) => setTrxnDate(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label for="validationCustom02">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="validationCustom02"
                    placeholder="Amount in Dollar"
                    value={trxnAmount}
                    onChange={(e) => setTrxnAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label for="validationCustom02">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom02"
                    placeholder="Account Debit, Account Credit"
                    value={trxnCategory}
                    onChange={(e) => setTrxnCategory(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label for="validationCustom02">Trxn ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom02"
                    placeholder="Enter Trxn ID"
                    value={trxnId}
                    onChange={(e) => setTrxnId(e.target.value)}
                  />
                </div>
                <div className="col-12 mb-3">
                  <label for="validationCustom02">Status</label>
                  <input
                    type="select"
                    className="form-control"
                    id="validationCustom02"
                    placeholder="Pending or Completed"
                    value={trxnStatus}
                    onChange={(e) => setTrxnStatus(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={onCreateTrxn}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* ADD ADMIN
                    < Button trigger modal                                                 
                    Modal  */}
      <form onSubmit={handleSubmit}>
        <div
          className="modal fade"
          id="add-admin"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Add New Admin
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="col-12 mb-3">
                  <label>User Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={onCreateAdmin}
                >
                  Add Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
