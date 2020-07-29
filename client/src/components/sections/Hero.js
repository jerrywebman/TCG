import React, { useState } from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import ButtonGroup from "../elements/ButtonGroup";
import Button from "../elements/Button";
import Image from "../elements/Image";
import { Link } from "react-router-dom";

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {
  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  };

  const outerClasses = classNames(
    "hero section center-content",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "hero-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  return (
    <section {...props} className={outerClasses}>
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1
              className="mt-0 mb-16 reveal-from-bottom"
              data-reveal-delay="200"
            >
              WELCOME TO{" "}
              <span className="text-color-primary">THE COIN GROWTH</span>
            </h1>
            <div className="container-xs">
              <h5
                className="m-0 mb-32 reveal-from-bottom"
                data-reveal-delay="400"
              >
                YOU'VE WORKED HARD FOR YOUR WEALTH.
              </h5>
              <p
                className="m-0 mb-2 reveal-from-bottom"
                data-reveal-delay="400"
              >
                Let our team work even harder to manage it
              </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <div class="arrow bounce">
                  <a class="fa fa-arrow-down fa-2x" href="#"></a>
                </div>
              </div>
            </div>
          </div>
          <Link
            style={{ marginTop: "1em", marginBottom: "1em" }}
            data-toggle="modal"
            data-target="#signup-form"
            className="button button-primary button-wide-mobile button-sm"
          >
            Join Now
          </Link>
          <div
            className="hero-figure reveal-from-bottom illustration-element-01"
            data-reveal-value="20px"
            data-reveal-delay="800"
          >
            <Image
              className="has-shadow"
              src={require("./../../assets/images/landing.jpg")}
              alt="Hero"
              width={896}
              height={504}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;
