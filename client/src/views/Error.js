import React, { useEffect } from "react";
import AuthModals from "../components/sections/AuthModals";

export default function Error() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container">
      <div className="row" style={{ marginTop: "7em" }}>
        <div className=" col-10 mx-auto text-center text-title text-uppercase pt-s">
          <h6 className=" display-3 mb-3 mt-3">.</h6>
          <h1> error </h1>
          <h2>Page not found</h2>
          <h3>
            the requested URL{" "}
            <span className="text-danger">{window.location.pathname}</span> was
            not found
          </h3>
        </div>
      </div>
      <AuthModals />
    </div>
  );
}
