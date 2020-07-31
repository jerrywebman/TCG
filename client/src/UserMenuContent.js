import React, { Component } from "react";
import PropTypes from "prop-types";
import "./menuContent.css";

import Image from "./components/elements/Image";

class UserMenuContent extends Component {
  constructor(props) {
    super(props);

    this.items = [];
    for (let i = 1; i <= 5; i++) {
      this.items.push(i);
    }
  }

  render() {
    return (
      <>
        <div style={{ backgroundColor: "black !important" }}>
          <Image
            src={require("./assets/images/logolg.svg")}
            alt="Open"
            width={80}
            height={60}
            style={{ margin: "1em 0 4em 4em" }}
          />
        </div>
        <div
          className="menu"
          style={{ marginTop: "3em", color: "black", fontWeight: "bold" }}
        >
          <div className="menu-item">
            <a href="/user/dashboard" onClick={this.props.closeCallback}>
              <i class="mdi mdi-monitor" style={{ marginRight: "1em" }}></i>
              <span>Dashboard</span>
            </a>
          </div>
          <div className="menu-item">
            <a href="/user/Referral" onClick={this.props.closeCallback}>
              <i
                class="mdi mdi-account-multiple-outline"
                style={{ marginRight: "1em" }}
              ></i>
              <span>Referral</span>
            </a>
          </div>
          <div className="menu-item">
            <a href="/user/Transactions" onClick={this.props.closeCallback}>
              <i
                class="mdi mdi-cash-multiple"
                style={{ marginRight: "1em" }}
              ></i>
              <span>All Transactions</span>
            </a>
          </div>
        </div>
        <div className="container">
          <p style={{ color: "black", marginTop: "3em", fontWeight: "bold" }}>
            The Coin Growth Investment Limited
          </p>
        </div>
      </>
    );
  }
}

UserMenuContent.propTypes = {
  closeCallback: PropTypes.func.isRequired,
};

export default UserMenuContent;
