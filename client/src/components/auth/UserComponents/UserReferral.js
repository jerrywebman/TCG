import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/Auth";
import { useHistory, Link } from "react-router-dom";
import firebase from "../firebase";

export default function UserReferral() {
  const { currentUser, setPending } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [referrals, setReferrals] = useState([]);
  const [referralUsername, setReferralUsername] = useState([]);

  const db = firebase.firestore();
  const history = useHistory();

  useEffect(() => {
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
    // //GET REFERRALS
    // const fetchReferral = async () => {
    //   let docref = await db.collection("users");

    //   var referralQuery = docref
    //     .where("referredBy", "==", "jayjay")
    //     .get()
    //     .then((querySnapshot) => {
    //       setReferrals(
    //         querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //       );
    //     });
    // };

    // fetchReferral();
  }, [currentUser]);

  return (
    <div>
      <div style={{ marginLeft: "2em" }}>
        <div className="row">
          <div className="col-md-6">
            <h3>
              Referred By:{" "}
              <span style={{ color: " #5658DD", marginLeft: ".5em" }}>
                {data.referredBy}
              </span>{" "}
            </h3>
          </div>

          <div className="col-md-6">
            <h3>
              Bonus:
              <span
                style={{
                  color: " #5658DD",
                  marginLeft: ".5em",
                }}
              >
                $40
              </span>
              <span
                style={{
                  marginLeft: ".5em",
                }}
              >
                <button
                  style={{
                    backgroundColor: " #5658DD",
                    color: "white",
                  }}
                  className="btn"
                >
                  Withdraw
                </button>
              </span>
            </h3>
          </div>
        </div>
        <hr></hr>
        <h3>Your Referral Link</h3>
        <h6 style={{ color: " #5658DD" }}>
          www.thecoingrowth.com/register/{data.username}
        </h6>
        <hr></hr>
        {/* REFERRALS */}
        <div>
          <h3>REFERRAL(S)</h3>
          <button
            style={{
              backgroundColor: " #5658DD",
              color: "white",
              marginBottom: "1em",
            }}
            className="btn"
            onClick={() => {
              //GET REFERRALS
              const fetchReferral = async () => {
                let docref = await db.collection("users");

                var referralQuery = docref
                  .where("referredBy", "==", data.username)
                  .get()
                  .then((querySnapshot) => {
                    setReferrals(
                      querySnapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                      }))
                    );
                  });
              };
              fetchReferral();
            }}
          >
            Show Referrals
          </button>
        </div>
        <div className="row mb-6">
          <div className="col-12">
            <div className="card">
              <div className="card-body new-user order-list">
                <h4 className="header-title mt-0 mb-3">REFERRAL(S)</h4>
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th
                          className="border-top-0"
                          style={{ paddingLeft: ".4em" }}
                        >
                          S/N
                        </th>
                        <th className="border-top-0">Name</th>
                        <th className="border-top-0">Username</th>

                        <th className="border-top-0">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referrals.map((item) => (
                        <tr>
                          <td style={{ paddingLeft: ".4em" }}>1</td>
                          <td>{item.name}</td>
                          <td>{item.username}</td>
                          <td>
                            <span className="badge badge-boxed  badge-soft-success">
                              Active
                            </span>
                          </td>
                          <td></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
