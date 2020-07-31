import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";
import { AuthContext } from "../../context/Auth";

import MailModal from "../../sections/MailModal";

export default function Withdrawal() {
  const { currentUser, pending } = useContext(AuthContext);
  const [pendingWithdrawal, setPendingWithdrawal] = useState([]);
  const db = firebase.firestore();
  useEffect(() => {
    //FETCH PENDING TRANSACTION
    const fetchPendingWithdrawal = async () => {
      let docRef = await db
        .collection("pendingWithdrawal")
        .onSnapshot((querySnapshot) => {
          setPendingWithdrawal(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        });
    };
    fetchPendingWithdrawal();
  }, [currentUser, pending, db]);
  return (
    <div>
      {/* PENDING WITHDRAWAL ORDER FOR ADMIN ACTION */}
      <div className="row">
        <div className="container">
          <div>
            <h3>PENDING WITHDRAWAL ORDER</h3>
          </div>
          <div className="row mb-6">
            <div className="col-12">
              <div className="card">
                <div className="card-body new-user order-list">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th className="border-top-0">Email</th>
                          <th className="border-top-0">Date</th>
                          <th className="border-top-0">Amount ($)</th>

                          <th className="border-top-0">Category</th>
                          <th className="border-top-0">Wallet</th>
                          <th className="border-top-0">Status</th>
                          <th className="border-top-0">Delete</th>
                          <th className="border-top-0">Send Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingWithdrawal.map((item) => (
                          <tr key={item.id}>
                            <td>{item.email}</td>
                            <td>{item.date}</td>
                            <td>{item.amount}</td>

                            <td>{item.category}</td>
                            <td>{item.wallet}</td>
                            <td>
                              <span className="badge badge-boxed  badge-soft-warning">
                                {item.status}
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => {
                                  db.collection("pendingWithdrawal")
                                    .doc(item.email)
                                    .delete()
                                    .then(function () {
                                      alert("Document successfully deleted!");
                                    })
                                    .catch(function (error) {
                                      console.error(
                                        "Error removing document: ",
                                        error
                                      );
                                    });

                                  const onCreateTrxn = () => {
                                    const db = firebase.firestore();
                                    db.collection("completedTrxn")
                                      .add({
                                        email: item.email,
                                        amount: item.amount,
                                        category: "Withdrawal Approved",
                                        date: item.date,
                                        plan: "",
                                        selectedWallet: item.wallet,
                                        status: "Completed",
                                      })
                                      .then(() => {})
                                      .catch((err) => {
                                        console.log(err);
                                      });
                                  };
                                  onCreateTrxn();
                                }}
                              >
                                X
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-success"
                                data-toggle="modal"
                                data-target="#email-modal"
                                onClick={() => {}}
                              >
                                Email
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <MailModal />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
