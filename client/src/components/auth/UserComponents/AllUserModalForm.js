import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";
import { AuthContext } from "../../context/Auth";
import { useHistory } from "react-router-dom";

export default function AllUserModalForm() {
  const { currentUser, pending } = useContext(AuthContext);

  const [data, setData] = useState({});

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState();
  const [fullname, setFullname] = useState();

  const [allPackage, setAllPackage] = useState([]);
  const [moreInfo, setMoreInfo] = useState({});
  const [tcgWallet, setTcgWallet] = useState({});

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
    fetchData();
    fetchMoreUserInfo();
  }, []);

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
    <>
      {/* /* <!-- ADD PENDING TRANSCTION DATA -->
                    <!-- Button trigger modal -->
                                                
                        <!-- Modal --> */}{" "}
      <form onSubmit={handleSubmit}>
        <div
          className="modal fade"
          id="pending-transaction-data"
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
                  Make a Deposit
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
                <div class="form-group">
                  <label for="exampleFormControlSelect"> Select Plan</label>
                  <select
                    class="form-control"
                    id="exampleFormControlSelect"
                    value={pendingPlan}
                    onChange={(e) => {
                      setPendingPlan(e.target.value);
                    }}
                    required
                  >
                    <option value="select">Select</option>
                    {allPackage.map((item) => (
                      <option key={item.packageName} value={item.packageName}>
                        {item.packageName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label for="validationCustom02">Amount to Spend ($)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="validationCustom02"
                    placeholder="Amount in Dollar"
                    value={pendingTrxnAmount}
                    onChange={(e) => {
                      setPendingTrxnAmount(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="form-group">
                  <label for="exampleFormControlSelect1">
                    {" "}
                    Spend Fund From
                  </label>
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    value={pendingWithdrawalWallet}
                    onChange={(e) => {
                      setPendingWithdrawalWallet(e.target.value);
                    }}
                    required
                  >
                    <option value="select">Select</option>
                    <option key={"BITCOIN"} value="BITCOIN">
                      BITCOIN
                    </option>
                    <option key={"ETHEREUM"} value="ETHEREUM">
                      ETHEREUM
                    </option>
                    <option key={"LITECOIN"} value="LITECOIN">
                      LITECOIN
                    </option>
                    <option key={"DOGE"} value="DOGE">
                      DOGE
                    </option>
                    <option key={"PAYEER"} value="PAYEER">
                      PAYEER
                    </option>
                    <option key={"PERFECT"} value="PERFECT">
                      PERFECT
                    </option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label for="checkox" className="mr-3">
                    Show/Refresh Payment Details
                  </label>
                  <input
                    type="checkbox"
                    id="checkox"
                    name="vehicle1"
                    onClick={() => {
                      if (pendingWithdrawalWallet == "BITCOIN") {
                        var spendingAddress = `${tcgWallet.btc}`;
                      } else if (pendingWithdrawalWallet == "ETHEREUM") {
                        var spendingAddress = `${tcgWallet.eth}`;
                      } else if (pendingWithdrawalWallet == "LITECOIN") {
                        var spendingAddress = `${tcgWallet.ltc}`;
                      } else if (pendingWithdrawalWallet == "DOGE") {
                        var spendingAddress = `${tcgWallet.doge}`;
                      } else if (pendingWithdrawalWallet == "PAYEER") {
                        var spendingAddress = `${tcgWallet.payeer}`;
                      } else if (pendingWithdrawalWallet == "PERFECT") {
                        var spendingAddress = `${tcgWallet.perfect}`;
                      } else {
                        alert(
                          "Kindly select a payment option and click the checkbox to refresh payment details"
                        );
                      }
                      const newHTML =
                        "<h4>Please send your payment to this wallet:</h4>";
                      document.getElementById(
                        "spending-text"
                      ).innerHTML = newHTML;

                      document.getElementById(
                        "spending-address"
                      ).innerHTML = spendingAddress;

                      const amnt = `${pendingTrxnAmount}`;
                      document.getElementById(
                        "spending-amount"
                      ).innerHTML = amnt;

                      const quote = "<h4>Amount to pay ($)</h4>";
                      document.getElementById(
                        "spending-quote"
                      ).innerHTML = quote;
                    }}
                    required
                  />
                </div>

                <div
                  id="spending-text"
                  className="mt-2"
                  style={{ color: "white" }}
                ></div>

                <div>
                  <h5 id="spending-address"></h5>
                </div>

                <div id="spending-quote"></div>
                <h5 id="spending-amount"></h5>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => {
                    setPendingWithdrawalWallet("");
                    setPendingTrxnAmount("");
                    setPendingWithdrawalWallet("");
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  data-dismiss="modal"
                  className="btn btn-success"
                  onClick={onCreateTrxn}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* /* <!-- ADD PENDING WITHDRAWAL -->
                    <!-- Button trigger modal -->
                                                
                        <!-- Modal --> */}{" "}
      <form onSubmit={handleSubmit} method="POST">
        <div
          className="modal fade"
          id="pending-withdrawal"
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
                  Submit Your Withdrawal Request
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
                  <label for="validationCustom02">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="validationCustom02"
                    placeholder="Amount in Dollar"
                    value={pendingWithdrawalAmount}
                    onChange={(e) => setPendingWithdrawalAmount(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="exampleFormControlSelect1"> Select Wallet</label>
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    value={pendingWithdrawalWallet}
                    onChange={(e) => {
                      setPendingWithdrawalWallet(e.target.value);
                    }}
                  >
                    <option value="">Select</option>
                    <option value={moreInfo.btcAddress}>
                      BITCOIN- {moreInfo.btcAddress}
                    </option>
                    <option value={moreInfo.ethAddress}>
                      ETHEREUM- {moreInfo.ethAddress}
                    </option>
                    <option value={moreInfo.ltcAddress}>
                      LITECOIN- {moreInfo.ltcAddress}
                    </option>
                    <option value={moreInfo.dogeAddress}>
                      DOGE- {moreInfo.dogeAddress}
                    </option>
                    <option value={moreInfo.payeerAddress}>
                      PAYEER- {moreInfo.payeerAddress}
                    </option>
                    <option value={moreInfo.perfectAddress}>
                      PERFECT- {moreInfo.perfectAddress}
                    </option>
                  </select>
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
                  onClick={onCreateWithdrawalTrxn}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
