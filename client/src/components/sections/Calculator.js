import React, { useState } from "react";

export default function Calculator() {
  const [answer, setAnswer] = useState();
  const [amount, setAmount] = useState();
  const [percent, setPercent] = useState();

  const onGenerate = () => {
    const numAmount = Number(amount);
    const numPercent = Number(percent);
    var percentValue = (numPercent / 100) * numAmount;

    var sum = numAmount + percentValue;
    setAnswer(sum);
  };
  const onClear = () => {
    setAmount(0);
    setAnswer(0);
    setPercent(0);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="col">
          <div className="row-lg-6">
            <div className="col-12 mb-3">
              <h2 className="mb-3">Interest Calculator</h2>
              <hr></hr>
              <h5 style={{ textAlign: "center", color: "#5658DD" }}>
                We will send you
              </h5>
              <h3 style={{ textAlign: "center" }}>${answer}</h3>
              <hr></hr>
            </div>
          </div>
          <div className="row-lg-6">
            <div className="col-12 mb-3">
              <label for="amount">
                <h5>Investment Amount($)</h5>
              </label>
              <input
                type="number"
                className="form-control"
                id="amount"
                placeholder="Enter a number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row-lg-6">
            <div className="col-12 mb-3">
              <label for="amount">
                <h5>Percentage(%) Gain</h5>
              </label>
              <input
                type="number"
                className="form-control"
                id="amount"
                placeholder="Enter a number"
                value={percent}
                onChange={(e) => setPercent(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2 mb-3 p-3"></div>
            <div className="col-5 mb-3">
              <button
                type="reset"
                className=" btn btn-danger"
                onClick={onClear}
                style={{
                  textAlign: "center",
                  fontSize: "1em",
                  fontWeight: "bold",
                }}
              >
                Clear
              </button>
            </div>

            <div className="col-5 mb-3">
              <button
                type="submit"
                className=" btn btn-success"
                onClick={onGenerate}
                style={{
                  textAlign: "center",
                  fontSize: "1em",
                  fontWeight: "bold",
                }}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
