import React, { Component } from "react";
import CheeseburgerMenu from "cheeseburger-menu";
import HamburgerMenu from "react-hamburger-menu";
import MenuContent from "../../../MenuContent";
import AccountInfo from "../AdminComponents/AccountInfo";
import SpecialFunctions from "../AdminComponents/SpecialFunctions";
import Package from "../AdminComponents/Package";

const contentStyles = {};

export default class AccountsInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
    };
  }

  openMenu() {
    this.setState({ menuOpen: true });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    return (
      <div style={{ marginTop: "7em", marginLeft: "1em" }}>
        <CheeseburgerMenu
          isOpen={this.state.menuOpen}
          closeCallback={this.closeMenu.bind(this)}
        >
          <MenuContent closeCallback={this.closeMenu.bind(this)} />
        </CheeseburgerMenu>

        <HamburgerMenu
          isOpen={this.state.menuOpen}
          menuClicked={this.openMenu.bind(this)}
          width={25}
          height={17}
          strokeWidth={3}
          rotate={0}
          color="white"
          borderRadius={0}
          animationDuration={0.9}
        />

        <div style={contentStyles}>
          <h3 style={{ marginTop: "2em" }}>Welcome</h3>
          <AccountInfo />
          <SpecialFunctions />
          <Package />
        </div>
      </div>
    );
  }
}
