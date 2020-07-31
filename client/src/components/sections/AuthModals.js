import React, { useState } from "react";
import firebase from "../auth/firebase";
import { Link, useHistory } from "react-router-dom";
// import * as emailjs from "emailjs-com";
// import axios from "axios";

export default function AuthModals() {
  //SIGNUP STATES
  const [name, setName] = useState("");
  const [referred, setReferred] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [btcAddress, setBtcAddress] = useState("");
  const [ethAddress, setEthAddress] = useState("");
  const [ltcAddress, setLtcAddress] = useState("");
  const [dogeAddress, setDogeAddress] = useState("");
  const [perfectAddress, setPerfectAddress] = useState("");
  const [payeerAddress, setPayeerAddress] = useState("");
  const [amountInvestment, setAmountInvestment] = useState("");
  const [percentage, setPercentage] = useState("");
  const [maturityDate, setMaturityDate] = useState("");
  //AUTHENTICATION

  let history = useHistory();
  //SIGNUP
  const onSignup = () => {
    const signupForm = document.querySelector("#signup-form");
    const auth = firebase.auth();
    const db = firebase.firestore();
    if (password !== confirmPassword) {
      signupForm.querySelector(
        ".error"
      ).innerHTML = `<p>Password did not match</p>`;
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((cred) => {
          return db.collection("users").doc(cred.user.uid).set({
            name,
            email,
            username,
          });
        })
        .then(() => {
          history.push("/user/dashboard");
          window.location.reload();

          db.collection("related").doc(email).set({
            balance: 0,
            btcAddress,
            ethAddress,
            ltcAddress,
            dogeAddress,
            perfectAddress,
            payeerAddress,
            amountInvestment,
            percentage,
            maturityDate,
          });

          if (email) {
            return db.collection("transaction").doc(email).set({
              amount: 0,
              category: "",
              date: "",
              email: "",
              status: "",
              trxnId: "",
            });
          }
        })
        .catch((err) => {
          signupForm.querySelector(".error").innerHTML = err.message;
        });
    }
  };

  //LOGIN
  const onLogin = () => {
    //signup the user
    const loginForm = document.querySelector("#login-form");
    const auth = firebase.auth();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((cred) => {
        //checking for state change
        auth.onAuthStateChanged((user) => {
          if (user) {
            user.getIdTokenResult().then((idTokenResult) => {
              user.admin = idTokenResult.claims.admin;
              if (user.admin === true) {
                history.push("/admin/dashboard");
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              } else {
                history.push("/user/dashboard");
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            });
          } else {
            history.push("/");
          }
        });
      })
      .catch((err) => {
        loginForm.querySelector(".error").innerHTML = err.message;
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // var templateParams = {
    //   name: "James",
    //   notes: "Check this out!",
    // };

    // emailjs.send(
    //   "gmail",
    //   "template_PlD1Xilt",
    //   templateParams,
    //   "user_WSEuxDi2XppgmyUaLBK1D"
    // );

    // const reg = axios.post("/api/reg", {
    //   name,
    //   email,
    //   password,
    // });
  };

  return (
    <div>
      {/* <!--  LOGIN FORM -->
       */}
      <form onSubmit={handleSubmit} className="login_form">
        <div
          className="modal fade"
          id="login-form"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="">
                  LOGIN
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <p class="error pink-text center-align"></p>
              </div>
              <div className="modal-body">
                <div className="col-12 mb-3">
                  <label for="email">Email Address</label>
                  <input
                    type="Email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-12 mb-3">
                  <label for="password">PASSWORD</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
              </div>
              <div className="modal-footer">
                <p>
                  Forgot Password?{" "}
                  <span style={{ color: "#5658DD" }}>
                    <Link to="/passwordreset">Click Here</Link>
                  </span>
                </p>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={onLogin}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* <!--  SIGNUP FORM -->
       */}
      <form onSubmit={handleSubmit} className="signup-form">
        <div
          className="modal fade"
          id="signup-form"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="">
                  SIGNUP
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
                <p class="error center-align" style={{ color: "red" }}></p>
                <p class="center-align">
                  <span style={{ color: "red", fontSize: "20px" }}>*</span> is
                  required
                </p>

                <div className="col-12 mb-3">
                  <label for="refer">
                    REFFERED BY
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="refer"
                    id="refer"
                    value={referred}
                    onChange={(e) => setReferred(e.target.value)}
                    required
                  />
                  <label for="name">
                    FULLNAME
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    placeholder="Fullname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label for="email">
                    EMAIL ADDRESS
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </label>
                  <input
                    type="Email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-12 mb-3">
                  <label for="username">
                    USERNAME
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </label>
                  <input
                    type="username"
                    className="form-control"
                    id="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <label for="password">
                    PASSWORD
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label for="password2">
                    CONFIRM PASSWORD
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password2"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <label for="btc">
                    BTC ADDRESS
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="btc"
                    placeholder="Bitcoin Address"
                    value={btcAddress}
                    onChange={(e) => setBtcAddress(e.target.value)}
                    required
                  />
                  <label for="eth">ETH ADDRESS</label>
                  <input
                    type="text"
                    className="form-control"
                    id="eth"
                    placeholder=" Eth Address"
                    value={ethAddress}
                    onChange={(e) => setEthAddress(e.target.value)}
                  />
                  <label for="ltc">LITECOIN ADDRESS</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ltc"
                    placeholder=" Ltc Address"
                    value={ltcAddress}
                    onChange={(e) => setLtcAddress(e.target.value)}
                  />

                  <label for="doge">DOGECOIN ADDRESS</label>
                  <input
                    type="text"
                    className="form-control"
                    id="doge"
                    placeholder="Doge Address"
                    value={dogeAddress}
                    onChange={(e) => setDogeAddress(e.target.value)}
                  />

                  <label for="perfect">PERFECT MONEY ADDRESS</label>
                  <input
                    type="text"
                    className="form-control"
                    id="perfect"
                    placeholder="Perfect Money Address"
                    value={perfectAddress}
                    onChange={(e) => setPerfectAddress(e.target.value)}
                  />
                  <label for="payeer">PAYEER ADDRESS</label>
                  <input
                    type="text"
                    className="form-control"
                    id="payeer"
                    placeholder="Payeer Address"
                    value={payeerAddress}
                    onChange={(e) => setPayeerAddress(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={onSignup}
                  >
                    Signup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
