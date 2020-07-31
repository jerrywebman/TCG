import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";
import { AuthContext } from "../../context/Auth";
import { useHistory } from "react-router-dom";
import MailModal from "../../sections/MailModal";

export default function Deposit() {
  const { currentUser, pending } = useContext(AuthContext);
  const db = firebase.firestore();
  //USER PENDING ORDER
  const [pendingTransaction, setPendingTransaction] = useState([]);

  useEffect(() => {
    //FETCH PENDING TRANSACTION
    const fetchPendingTrxn = async () => {
      let docRef = await db
        .collection("pendingOrder")
        .onSnapshot((querySnapshot) => {
          setPendingTransaction(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        });
    };
    fetchPendingTrxn();
  }, [currentUser, pending, db]);

  return (
    <div>
      <div className="row">
        <div className="container">
          <div>
            <h3>PENDING DEPOSIT ORDER</h3>
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
                          <th className="border-top-0">Selected Plan</th>
                          <th className="border-top-0">Selected TCG Wallet</th>
                          <th className="border-top-0">Status</th>
                          <th className="border-top-0">Delete</th>
                          <th className="border-top-0">Send Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingTransaction.map((item) => (
                          <tr key={item.id}>
                            <td>{item.email}</td>
                            <td>{item.date}</td>
                            <td>{item.amount}</td>

                            <td>{item.category}</td>
                            <td>{item.selectedPlan}</td>
                            <td>{item.selectedWallet}</td>
                            <td>
                              <span className="badge badge-boxed  badge-soft-warning">
                                {item.status}
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => {
                                  db.collection("pendingOrder")
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

                                  // CREATE Completed Transaction

                                  const onCreateTrxn = () => {
                                    const db = firebase.firestore();
                                    db.collection("completedTrxn")
                                      .add({
                                        email: item.email,
                                        amount: item.amount,
                                        category: "Deposit Approved",
                                        date: item.date,
                                        plan: item.selectedPlan,
                                        selectedWallet: item.selectedWallet,
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
