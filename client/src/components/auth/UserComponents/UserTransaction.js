import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";
import { AuthContext } from "../../context/Auth";

export default function UserTransaction() {
  const { currentUser, pending } = useContext(AuthContext);
  const [transaction, setTransaction] = useState([]);
  const [pendingTransaction, setPendingTransaction] = useState([]);
  const [completedTransaction, setCompletedTransaction] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    //FETCH PENDING WITHDRAWAL
    const fetchPendingWithdrawal = async () => {
      let docref = await db.collection("pendingOrder");
      var referralQuery = docref
        .where("email", "==", currentUser.email)
        .get()
        .then((querySnapshot) => {
          setPendingTransaction(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        });
    };
    fetchPendingWithdrawal();
  }, [currentUser, pending]);
  return (
    <div>
      {/* LAST TRANSACTION */}
      <div>
        <h3>PENDING TRANSACTION(S)</h3>
      </div>
      <div className="row mb-6">
        <div className="col-12">
          <div className="card">
            <div className="card-body new-user order-list">
              <h4 className="header-title mt-0 mb-3">TRANSACTION(S)</h4>
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="thead-light">
                    <tr>
                      <th className="border-top-0">S/N</th>
                      <th className="border-top-0">Date</th>
                      <th className="border-top-0">Amount ($)</th>
                      <th className="border-top-0">Category</th>
                      {/* <th className="border-top-0">Trxn ID</th> */}
                      <th className="border-top-0">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingTransaction.map((item) => (
                      <tr>
                        <td>1</td>
                        <td>{item.date}</td>
                        <td>{item.amount}</td>
                        <td>{item.category}</td>
                        {/* <td>{transaction.trxnId}</td> */}
                        <td>
                          <span className="badge badge-boxed  badge-soft-info">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ALL TRANSACTIONS */}
      <div>
        <h3>ALL TRANSACTION(S)</h3>
        <button
          style={{
            backgroundColor: " #5658DD",
            color: "white",
            marginBottom: "1em",
          }}
          className="btn"
          onClick={() => {
            //GET ALL TRANSACTIONS
            //FETCH USER  COMPLETED TRANSACTION
            const fetchCompletedTrxn = async () => {
              let docref = await db.collection("completedTrxn");
              var referralQuery = docref
                .where("email", "==", currentUser.email)
                .get()
                .then((querySnapshot) => {
                  setCompletedTransaction(
                    querySnapshot.docs.map((doc) => ({
                      ...doc.data(),
                      id: doc.id,
                    }))
                  );
                });
            };
            fetchCompletedTrxn();
          }}
        >
          Show All Transaction
        </button>
      </div>
      <div className="row mb-6">
        <div className="col-12">
          <div className="card">
            <div className="card-body new-user order-list">
              <h4 className="header-title mt-0 mb-3">TRANSACTION(S)</h4>
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="thead-light">
                    <tr>
                      <th className="border-top-0">S/N</th>
                      <th className="border-top-0">Date</th>
                      <th className="border-top-0">Amount ($)</th>
                      <th className="border-top-0">Category</th>
                      <th className="border-top-0">Selected Plan </th>
                      <th className="border-top-0">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedTransaction.map((item) => (
                      <tr>
                        <td>1</td>
                        <td>{item.date}</td>
                        <td>{item.amount}</td>
                        <td>{item.category}</td>
                        <td>{item.plan}</td>
                        <td>
                          <span className="badge badge-boxed  badge-soft-success">
                            {item.status}
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
  );
}
