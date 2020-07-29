import React, { useEffect, useState } from "react";
import AuthModals from "../components/sections/AuthModals";
import firebase from "../components/auth/firebase";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onResetPassword = () => {
    const auth = firebase.auth();

    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        const newHTML =
          "<h5>We just sent you an email, Please check your mailbox</h5>";
        document.getElementById("reset-form").innerHTML = newHTML;
      })
      .catch(function (error) {
        const newHTML = "<h5>Email not found</h5>";
        document.getElementById("reset-form").innerHTML = newHTML;
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <div className="row">
        <div className=" col-9 mx-auto text-center text-title text-uppercase pt-s">
          <form
            style={{ marginTop: "9em" }}
            id="reset-form"
            onSubmit={handleSubmit}
          >
            <h3>Password Reset</h3>
            <div className="form-group mt-1 ">
              <label for="exampleInputEmail1"></label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={onResetPassword}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <AuthModals />
    </div>
  );
}
