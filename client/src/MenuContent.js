import React, { Component } from "react";
import PropTypes from "prop-types";
import "./menuContent.css";

import Image from "./components/elements/Image";

class MenuContent extends Component {
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
            <a href="/admin/dashboard" onClick={this.props.closeCallback}>
              <i class="mdi mdi-monitor" style={{ marginRight: "1em" }}></i>
              <span>Dashboard</span>
            </a>
          </div>
          <div className="menu-item">
            <a href="/admin/Withdrawal" onClick={this.props.closeCallback}>
              <i
                class="mdi mdi-clipboard-check"
                style={{ marginRight: "1em" }}
              ></i>
              <span>Pending Withdrawal</span>
            </a>
          </div>
          <div className="menu-item">
            <a href="/admin/Deposit" onClick={this.props.closeCallback}>
              <i
                class="mdi mdi-wallet-travel"
                style={{ marginRight: "1em" }}
              ></i>
              <span>Pending Deposit</span>
            </a>
          </div>
          <div className="menu-item">
            <a href="/admin/Users" onClick={this.props.closeCallback}>
              <i
                class="mdi mdi-account-multiple-outline"
                style={{ marginRight: "1em" }}
              ></i>
              <span>Users</span>
            </a>
          </div>
          <div className="menu-item">
            <a href="/admin/Transactions" onClick={this.props.closeCallback}>
              <i
                class="mdi mdi-cash-multiple"
                style={{ marginRight: "1em" }}
              ></i>
              <span>Transactions</span>
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

MenuContent.propTypes = {
  closeCallback: PropTypes.func.isRequired,
};

export default MenuContent;
