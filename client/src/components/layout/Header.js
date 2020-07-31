import React, { useState, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link, useHistory } from "react-router-dom";
import Logo from "./partials/Logo";
import firebase from "../auth/firebase";
import { AuthContext } from "../context/Auth";

const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
};

const defaultProps = {
  navPosition: "",
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false,
};

const Header = ({
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  ...props
}) => {
  //AUTHENTICATION STATE
  const { currentUser } = useContext(AuthContext);
  const [isActive, setIsactive] = useState(false);

  const nav = useRef(null);
  const hamburger = useRef(null);
  let history = useHistory();

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener("keydown", keyPress);
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("keydown", keyPress);
      document.addEventListener("click", clickOutside);
      closeMenu();
    };
  });

  //SIGNOUT
  const onSignOut = () => {
    firebase.auth().signOut();
    // ["primary", "secondary", "success"].map((variant, idx) => (
    //   <Alert key={idx} variant={variant}>
    //     this is a {variant} alert-check it out
    //   </Alert>
    // ));
    history.push("/");
  };
  const openMenu = () => {
    document.body.classList.add("off-nav-is-active");
    nav.current.style.maxHeight = nav.current.scrollHeight + "px";
    setIsactive(true);
  };

  const closeMenu = () => {
    document.body.classList.remove("off-nav-is-active");
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  };

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  };

  const clickOutside = (e) => {
    if (!nav.current) return;
    if (
      !isActive ||
      nav.current.contains(e.target) ||
      e.target === hamburger.current
    )
      return;
    closeMenu();
  };

  const classes = classNames(
    "site-header",
    bottomOuterDivider && "has-bottom-divider",
    className
  );

  return (
    <header {...props} className={classes}>
      <div
        id="google_translate_element"
        style={{ position: "absolute", right: "0" }}
      ></div>

      <div className="container">
        <div
          className={classNames(
            "site-header-inner",
            bottomDivider && "has-bottom-divider"
          )}
        >
          <Logo />
          {!hideNav && (
            <>
              <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader">Menu</span>
                <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              <nav
                ref={nav}
                className={classNames("header-nav", isActive && "is-active")}
              >
                {!currentUser ? (
                  <div className="header-nav-inner">
                    <ul
                      className={classNames(
                        "list-reset text-xs",
                        navPosition && `header-nav-${navPosition}`
                      )}
                    >
                      <li>
                        <Link to="/" onClick={closeMenu}>
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link to="/about" onClick={closeMenu}>
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link to="/faq" onClick={closeMenu}>
                          FAQ
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact" onClick={closeMenu}>
                          Contact Us
                        </Link>
                      </li>
                    </ul>

                    {!hideSignin && (
                      <ul className="list-reset header-nav-right">
                        <li>
                          <Link
                            data-toggle="modal"
                            data-target="#signup-form"
                            className="button button-primary button-wide-mobile button-sm"
                            onClick={closeMenu}
                          >
                            Sign up
                          </Link>
                        </li>

                        <li>
                          <Link
                            data-toggle="modal"
                            data-target="#login-form"
                            className="button button-primary button-wide-mobile button-sm"
                            onClick={closeMenu}
                          >
                            Login
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                ) : (
                  <div className="header-nav-inner">
                    <ul
                      className={classNames(
                        "list-reset text-xs",
                        navPosition && `header-nav-${navPosition}`
                      )}
                    >
                      <li>
                        <Link to="/" onClick={closeMenu}>
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link to="/about" onClick={closeMenu}>
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link to="/faq" onClick={closeMenu}>
                          FAQ
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact" onClick={closeMenu}>
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                    {!hideSignin && (
                      <ul className="list-reset header-nav-right">
                        <li>
                          <Link
                            onClick={() => {
                              if (currentUser.admin === true) {
                                history.push("/admin/dashboard");
                              } else {
                                history.push("/user/dashboard");
                              }
                            }}
                          >
                            My Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            to=""
                            data-toggle="modal"
                            data-target="#login-form"
                            className="button button-primary button-wide-mobile button-sm"
                            onClick={onSignOut}
                          >
                            Logout
                          </Link>
                        </li>
                        <li>
                          <div id="google_translate_element"></div>
                        </li>
                      </ul>
                    )}
                  </div>
                )}
              </nav>
            </>
          )}
        </div>
      </div>

      <coingecko-coin-price-marquee-widget
        coin-ids="bitcoin,ethereum,eos,ripple,litecoin,dogecoin"
        currency="usd"
        background-color="#ffffff"
        locale="en"
        style={{ marginBottom: "1em" }}
      ></coingecko-coin-price-marquee-widget>
    </header>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
