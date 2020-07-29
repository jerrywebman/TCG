import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Logo from "./partials/Logo";
import FooterNav from "./partials/FooterNav";
// import FooterSocial from "./partials/FooterSocial";

const propTypes = {
  topOuterDivider: PropTypes.bool,
  topDivider: PropTypes.bool,
};

const defaultProps = {
  topOuterDivider: false,
  topDivider: false,
};

const Footer = ({ className, topOuterDivider, topDivider, ...props }) => {
  const classes = classNames(
    "site-footer center-content-mobile",
    topOuterDivider && "has-top-divider",
    className
  );

  return (
    <footer {...props} className={classes}>
      <marquee>
        <span style={{ color: "#5658DD" }}>
          OUR APPROVED WALLET ADDRESS: BTC:
        </span>{" "}
        3C9Q8aaRidVSJadsa9Pi1AnxqVSSF3nnKY -{" "}
        <span style={{ color: "#5658DD" }}>ETH:</span>{" "}
        0xc0bEc74ddC5a1c96a76d148BBea3f587e15f1eA2 -{" "}
        <span style={{ color: "#5658DD" }}>DOGE:</span>{" "}
        D698UvUVqdmKiTuShYY2AShCWYnGdzaibf -{" "}
        <span style={{ color: "#5658DD" }}>LTC:</span>{" "}
        MRwJZCTnLcWkjjHTSMEYsCDoNpd5Mpx5y8 -{" "}
        <span style={{ color: "#5658DD" }}>-PAYEER:</span> P1030031239 -{" "}
        <span style={{ color: "#5658DD" }}>-PERFECT MONEY:</span> U23138741
      </marquee>
      <div className="container">
        <div
          className={classNames(
            "site-footer-inner",
            topDivider && "has-top-divider"
          )}
        >
          <div className="footer-top space-between text-xxs">
            <Logo />
          </div>
          <div className="footer-top space-between text-xxs">
            <div className="footer-copyright">
              Engen 111, 5011 Bergen Norway
            </div>
            <div className="footer-copyright">
              <a href="mailto: info@thecoingrowth.com">
                Info@thecoingrowth.com
              </a>
            </div>
            <div className="footer-copyright">
              {" "}
              <a href="https://wa.me/13104006560">
                Whatsapp: +1 (310) 400-6560
              </a>
            </div>
          </div>

          <div className="footer-bottom space-between text-xxs invert-order-desktop">
            <FooterNav />
            <div className="footer-copyright">
              @ 2018 - 2020 <a>The Coin Growth Investment Limited</a>. All right
              reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
