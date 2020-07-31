import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";
import { AuthContext } from "../../context/Auth";
import { useHistory, Link } from "react-router-dom";

export default function Package() {
  const { currentUser, pending } = useContext(AuthContext);

  const db = firebase.firestore();
  const [allPackage, setAllPackage] = useState([]);

  useEffect(() => {
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

    fetchData();
  });
  return (
    <div>
      {/* PLAN */}
      <div className="container">
        <div>
          <h3>PLAN(S)</h3>
        </div>
        <div className="row">
          {allPackage.map((item) => (
            <div className="col-lg-4">
              <div class="card" key={item.id}>
                <div class="card-body">
                  <h4 class="card-title">
                    <span className="testimonial-item-link">
                      {item.packageName}
                    </span>
                  </h4>
                  <p class="card-text">
                    Minimum investment -{" "}
                    <span className="testimonial-item-link">
                      ${item.packageMinAmount}
                    </span>
                    <br></br>
                    Maximum investment -{" "}
                    <span className="testimonial-item-link">
                      ${item.packageMaxAmount}
                    </span>{" "}
                    <br></br>
                    Profit -{" "}
                    <span className="testimonial-item-link">
                      {item.profit}%
                    </span>{" "}
                    <br></br>
                    Duration -{" "}
                    <span className="testimonial-item-link">
                      {item.duration}
                    </span>{" "}
                    <br></br>
                    <Link
                      style={{ marginTop: "1em" }}
                      data-toggle="modal"
                      data-target="#pending-transaction-data"
                      className="button button-primary button-wide-mobile button-sm"
                    >
                      Choose Plan
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
