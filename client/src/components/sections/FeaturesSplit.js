import React from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";

const propTypes = {
  ...SectionSplitProps.types,
};

const defaultProps = {
  ...SectionSplitProps.defaults,
};

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {
  const outerClasses = classNames(
    "features-split section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "features-split-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const splitClasses = classNames(
    "split-wrap",
    invertMobile && "invert-mobile",
    invertDesktop && "invert-desktop",
    alignTop && "align-top"
  );

  const sectionHeader = {
    title: "Our 3 Pronged Approach",
    paragraph:
      " Whether the need is to strategically expand cash flow, adjust portfolios for transitory life stages, or preserve and facilitate multigenerational wealth, The Coin Growth tailors each financial solution to each client’s unique circumstances from the start to finish.",
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={splitClasses}>
            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-left"
                data-reveal-container=".split-item"
              >
                <h3 className="mt-0 mb-12">Invest To Earn</h3>
                <p className="m-0">
                  The Coin Growth Interest Account (TCGIA) lets you put your
                  crypto to work and earn monthly interest payments in the
                  asset-type that you deposit with The Coin Growth.
                  <hr></hr>
                  The Coin Growth clients using the TCGIA earn compound interest
                  in crypto, significantly increasing their Bitcoin, Ethereum,
                  Litecoin balances over time.
                  {/* , Perfect money, Payeer, Dodge Coin  */}
                  <hr></hr>
                  Just Pick your preferred package, Contact our support to fund
                  your Account with ease.
                </p>
                <div className="text-xxs text-color-primary fw-600 tt-u mt-8">
                  invest
                </div>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <Image
                  src={require("./../../assets/images/payments.png")}
                  alt="Features split 01"
                  width={528}
                  height={396}
                />
              </div>
            </div>

            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-right"
                data-reveal-container=".split-item"
              >
                <h3 className="mt-0 mb-12">
                  We Will Assign You To Our Experts
                </h3>
                <p className="m-0">
                  Get the best of fund management's service combines our vast
                  experience and expertise in investment management. With us
                  your investments are safe and we always keep to our words.
                  <hr></hr>
                </p>
                <div className="text-xxs text-color-primary fw-600 tt-u mt-8">
                  Stay Calm while our experts work
                </div>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <Image
                  src={require("./../../assets/images/experts.jpg")}
                  alt="Features split 02"
                  width={528}
                  height={396}
                />
              </div>
            </div>

            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-left"
                data-reveal-container=".split-item"
              >
                <h3 className="mt-0 mb-12">
                  Earn Your Percentage Interest Based On Your Subscribed Package
                </h3>
                <p className="m-0">
                  <hr></hr>
                  We pay you daily, weekly, monthly or annual interest.The
                  interest/earnings is based on your subscribed package
                  <hr></hr>
                </p>
                <div className="text-xxs text-color-primary fw-600 tt-u mt-4 mb-8">
                  Earn
                </div>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <Image
                  src={require("./../../assets/images/coins.png")}
                  alt="Features split 03"
                  width={528}
                  height={396}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
