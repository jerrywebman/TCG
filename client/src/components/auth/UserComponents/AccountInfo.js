import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";
import { AuthContext } from "../../context/Auth";
import { useHistory, Link } from "react-router-dom";
import Image from "../../elements/Image";

export default function AccountInfo() {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState({});

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState();
  const [fullname, setFullname] = useState();

  const [allPackage, setAllPackage] = useState([]);
  const [moreInfo, setMoreInfo] = useState({});
  const [tcgWallet, setTcgWallet] = useState({});
  const [transaction, setTransaction] = useState({});

  //PENDING TRANSACTIONS STATES
  const [pendingTrxnAmount, setPendingTrxnAmount] = useState("");
  const [pendingWithdrawalAmount, setPendingWithdrawalAmount] = useState("");
  const [pendingWithdrawalWallet, setPendingWithdrawalWallet] = useState("");
  const [pendingPlan, setPendingPlan] = useState("");

  const [pendingTrxnId, setPendingTrxnId] = useState("");
  const [pendingPackageName, setPendingPackageName] = useState("");
  const [pendingTrxnDate, setPendingTrxnDate] = useState("");

  const db = firebase.firestore();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    //getPackage
    const fetchData = async () => {
      let docRef = await db
        .collection("package")
        .orderBy("createdAt", "asc")
        .onSnapshot((querySnapshot) => {
          setAllPackage(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
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

    //FETCH TRANSACTION
    const fetchTrxn = async () => {
      let docRef = await db
        .collection("transaction")
        .doc(currentUser.email)
        .onSnapshot((doc) => {
          setTransaction(doc.data());
        });
    };

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
    fetchTrxn();
    fetchData();
    fetchMoreUserInfo();
  }, [currentUser]);

  //EDIT PROFILE
  const onEditProfile = () => {
    if (username !== null && fullname !== null) {
      db.collection("users").doc(currentUser.uid).set({
        name: fullname,
        username,
      });
    }
    alert("Profile Updated");
  };

  //ADD PENDING ORDER
  const onCreateTrxn = () => {
    const newDate = new Date();
    const jsonDate = JSON.stringify(newDate);
    console.log(jsonDate);
    db.collection("pendingOrder")
      .doc(currentUser.email)
      .set({
        email: currentUser.email,
        amount: pendingTrxnAmount,
        category: "Request to Deposit",
        date: jsonDate,
        packageName: pendingPackageName,
        selectedWallet: pendingWithdrawalWallet,
        selectedPlan: pendingPlan,
        status: "Pending",
      })
      .then(() => {
        alert("We have received your order, it will be processed soon");
      })
      .catch((err) => {
        alert(err);
      });
  };

  //ADD PENDING WITHDRAWAL
  const onCreateWithdrawalTrxn = () => {
    const newDate = new Date();
    const jsonDate = JSON.stringify(newDate);
    console.log(jsonDate);
    if (moreInfo.balance >= pendingWithdrawalAmount) {
      db.collection("pendingWithdrawal")
        .doc(currentUser.email)
        .set({
          email: currentUser.email,
          amount: pendingWithdrawalAmount,
          category: "Request to Withdraw",
          date: jsonDate,
          wallet: pendingWithdrawalWallet,
          status: "Pending",
        })
        .then(() => {
          alert(
            "We have received your Withdrawal request, it will be processed soon"
          );
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Insufficient Balance");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onSpend = () => {
    if (pendingPlan === "select") {
      alert("Kindly select a plan");
    }
    const newHTML =
      "<p>Please send your payments to this wallet: <strong>{tcgWallet.btc}</strong></p>";
    document.getElementById("spending-option").innerHTML = newHTML;
  };

  return (
    <div style={{ marginTop: "3em" }}>
      <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body mb-0">
              <div className="row">
                <div className="col-12 align-self-center">
                  <div className="">
                    <h5>Welcome, {data.username}</h5>
                    <hr></hr>
                    <h4 className="mt-0 header-title">
                      Email: {currentUser.email}
                    </h4>
                    <hr></hr>
                    <h4 className="mt-0 header-title">
                      Fullname : {data.name}
                    </h4>
                    <hr></hr>
                    <Link
                      data-toggle="modal"
                      data-target="#info-data"
                      className="button button-primary button-wide-mobile button-sm"
                    >
                      Edit Account Information
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /* <!-- EDIT INFORMATION MODAL FORM -->
                    <!-- Button trigger modal -->
                                                
                        <!-- Modal --> */}{" "}
        <form onSubmit={handleSubmit}>
          <div
            className="modal fade"
            id="info-data"
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
                    Edit Account Information
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
                    <label for="validationCustom01">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      placeholder={data.name}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label for="validationCustom02">Fullname</label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom02"
                      placeholder={data.name}
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
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
                    onClick={onEditProfile}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
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
                <div className="row">
                  <div className="col-lg-6">
                    <Link
                      style={{ marginTop: "1em", marginBottom: "1em" }}
                      data-toggle="modal"
                      data-target="#pending-transaction-data"
                      className="button button-primary button-wide-mobile button-sm"
                    >
                      Deposit
                    </Link>
                  </div>

                  <div className="col-lg-6">
                    <Link
                      style={{ marginTop: "1em", marginBottom: "1em" }}
                      data-toggle="modal"
                      data-target="#pending-withdrawal"
                      className="button button-primary button-wide-mobile button-sm"
                    >
                      Withdraw
                    </Link>
                  </div>
                </div>
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
                            <i className="dripicons-pin bg-soft-warning"></i>
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
                            Ltc: {moreInfo.ltcAddress}
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
                            Your Wallet Address
                          </h4>
                          <div className="icon-info my-3">
                            <i className="dripicons-wallet bg-soft-warning"></i>
                          </div>
                          <hr></hr>
                          <h6 className="mb-1 text-muted">
                            Doge: {moreInfo.dogeAddress}
                          </h6>
                          <hr></hr>
                          <h6 className="mb-1 text-muted">
                            Perfect: {moreInfo.perfectAddress}
                          </h6>
                          <hr></hr>
                          <h6 className="mb-1 text-muted">
                            Payeer: {moreInfo.payeerAddress}
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
                            Doge: {tcgWallet.doge}
                          </h6>
                          <hr></hr>
                          <h6 className="mb-1 text-muted">
                            Perfect Money: {tcgWallet.perfect}
                          </h6>
                          <hr></hr>
                          <h6 className="mb-1 text-muted">
                            Lth: {tcgWallet.ltc}
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
