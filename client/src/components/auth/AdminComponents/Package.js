import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";
import { AuthContext } from "../../context/Auth";

export default function Package() {
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
      <div className="row">
        {allPackage.map((item) => (
          <div className="col-lg-4">
            <div class="card" key={item.id}>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => {
                  const db = firebase.firestore();
                  db.collection("package")
                    .doc(item.id)
                    .delete()
                    .then(() => {
                      alert("Document successfully deleted!");
                    })
                    .catch((error) => {
                      console.error("Error removing document: ", error);
                    });
                }}
              >
                Delete
              </button>
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
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
