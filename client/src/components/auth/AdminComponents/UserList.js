import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";
import { AuthContext } from "../../context/Auth";
import CheeseburgerMenu from "cheeseburger-menu";
import HamburgerMenu from "react-hamburger-menu";
import MenuContent from "../../../MenuContent";

export default function UserList() {
  const { currentUser, pending } = useContext(AuthContext);
  const [allUserInfo, setAllUserInfo] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    //FETCH ALL USER INFORMATION

    const fetchAllUserInfo = async () => {
      const db = firebase.firestore();
      let docRef = await db
        .collection("related")
        .orderBy("balance")
        .onSnapshot(function (querySnapshot) {
          setAllUserInfo(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        });
    };

    fetchAllUserInfo();
  }, [currentUser, pending]);
  return (
    <div className="row mb-6">
      <div className="col-12">
        <div className="card">
          <div className="card-body new-user order-list">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="thead-light">
                  <tr>
                    <th className="border-top-0">Email</th>
                    <th className="border-top-0">Balance($)</th>
                    <th className="border-top-0">Btc address</th>
                    <th className="border-top-0">Eth address</th>
                    <th className="border-top-0">Ltc address</th>
                    <th className="border-top-0">Doge address</th>
                    <th className="border-top-0">Payeer</th>
                    <th className="border-top-0">Perfect</th>
                  </tr>
                </thead>

                <tbody>
                  {allUserInfo.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.balance}</td>
                      <td>{item.btcAddress}</td>
                      <td>{item.ethAddress}</td>
                      <td>{item.ltcAddress}</td>
                      <td>{item.dogeAddress}</td>
                      <td>{item.payeerAddress}</td>
                      <td>{item.perfectAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
