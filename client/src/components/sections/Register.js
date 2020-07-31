import React, { useState, useEffect } from "react";
import firebase from "../auth/firebase";
import { useHistory } from "react-router-dom";
// import * as emailjs from "emailjs-com";
// import axios from "axios";

export default function Register() {
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

  useEffect(() => {
    var pathArray = window.location.pathname.split("/");
    console.log(pathArray);
    const referral = pathArray[2];
    console.log(referral);
    setReferred(referral);
  }, [referred]);
  //SIGNUP
  const onSignup = () => {
    const signupForm = document.querySelector("#signup-form");
    const auth = firebase.auth();
    const db = firebase.firestore();
    if (password !== confirmPassword) {
      // var signupBtn = document.getElementById("btn-signup");
      // // signupBtn.disabled = "disabled";
      signupForm.querySelector(
        ".error"
      ).innerHTML = `<p>Password did not match</p>`;
    } else {
      // signupForm.removeAttr("disabled");
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((cred) => {
          return db.collection("users").doc(cred.user.uid).set({
            name,
            email,
            username,
            referredBy: referred,
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="container">
        <h2 style={{ marginLeft: ".8em", marginTop: "3em" }}>
          Registration page
        </h2>
        {/* {/* <!--  SIGNUP FORM --> */}

        <form onSubmit={handleSubmit} className="signup-form" id="signup-form">
          <div className="modal-body">
            <p class="error center-align" style={{ color: "red" }}></p>
            <p class="center-align">
              <span style={{ color: "red", fontSize: "20px" }}>*</span> is
              required
            </p>

            <div className="col-12 mb-3">
              <div class="form-group">
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
              </div>
              <div class="form-group">
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
              </div>
              <div class="form-group">
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
              </div>

              <div className="form-group">
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
              </div>
              <div class="form-group">
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
              </div>
              <div class="form-group">
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
              </div>
              <div class="form-group">
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
              </div>
              <div class="form-group">
                <label for="eth">ETH ADDRESS</label>
                <input
                  type="text"
                  className="form-control"
                  id="eth"
                  placeholder=" Eth Address"
                  value={ethAddress}
                  onChange={(e) => setEthAddress(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="ltc">LITECOIN ADDRESS</label>
                <input
                  type="text"
                  className="form-control"
                  id="ltc"
                  placeholder=" Ltc Address"
                  value={ltcAddress}
                  onChange={(e) => setLtcAddress(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="doge">DOGECOIN ADDRESS</label>
                <input
                  type="text"
                  className="form-control"
                  id="doge"
                  placeholder="Doge Address"
                  value={dogeAddress}
                  onChange={(e) => setDogeAddress(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="perfect">PERFECT MONEY ADDRESS</label>
                <input
                  type="text"
                  className="form-control"
                  id="perfect"
                  placeholder="Perfect Money Address"
                  value={perfectAddress}
                  onChange={(e) => setPerfectAddress(e.target.value)}
                />
              </div>
              <div class="form-group">
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
            </div>

            <div className="modal-footer">
              <button
                id="btn-signup"
                type="submit"
                className="btn btn-success"
                onClick={onSignup}
                // disabled="disabled"
              >
                Signup
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
