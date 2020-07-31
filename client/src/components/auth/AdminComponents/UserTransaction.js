import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";
import { AuthContext } from "../../context/Auth";

export default function UserTransaction() {
  const { currentUser, pending } = useContext(AuthContext);
  const [transaction, setTransaction] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    //FETCH TRANSACTION
    const fetchTrxn = async () => {
      let docRef = await db
        .collection("completedTrxn")
        .onSnapshot((querySnapshot) => {
          setTransaction(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        });
    };

    fetchTrxn();
  }, [currentUser, pending, db]);
  return (
    <div>
      <div>
        <h3>User(s) Transaction</h3>
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
                      <th className="border-top-0">Email</th>
                      <th className="border-top-0">Date</th>
                      <th className="border-top-0">Amount ($)</th>
                      <th className="border-top-0">Category</th>
                      {/* <th className="border-top-0">Trxn ID</th> */}
                      <th className="border-top-0">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction.map((item) => (
                      <tr>
                        <td>{item.email}</td>
                        <td>{item.date}</td>
                        <td>{item.amount}</td>
                        <td>{item.category}</td>
                        {/* <td>{item.trxnId}</td> */}
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
