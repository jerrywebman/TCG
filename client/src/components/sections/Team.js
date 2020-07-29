import React, { useContext } from "react";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { SectionTilesProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import { AuthContext } from "../context/Auth";

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};

const Team = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {
  const outerClasses = classNames(
    "testimonial section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "testimonial-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const tilesClasses = classNames("tiles-wrap", pushLeft && "push-left");

  const sectionHeader = {
    title: "Our Team",
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>
            <div
              className="tiles-item reveal-from-right"
              data-reveal-delay="200"
            >
              <div
                class="card"
                style={{
                  backgroundColor: "white",
                  borderRadius: "15% 0 0 0",
                }}
              >
                <img
                  style={{
                    borderRadius: "15% 0 0 0",
                  }}
                  class="card-img-top"
                  src={require("./../../assets/images/found.jpeg")}
                  alt="founder photo"
                />
                <div class="card-body">
                  <h5
                    style={{
                      color: "black",

                      marginTop: "0",
                    }}
                  >
                    Pernille Skou -{" "}
                    <span
                      style={{
                        color: "#5658DD",
                        textAlign: "center",
                        marginTop: "0",
                        fontWeight: "600",
                      }}
                    >
                      Founder/CEO
                    </span>
                  </h5>

                  <hr></hr>
                  <h5
                    style={{
                      color: "black",

                      marginTop: "0",
                      fontSize: ".7em",
                      fontWeight: "800",
                    }}
                  >
                    Pernille is an innovative leader with over 12 years of
                    experience in the financial sector and has managed over 8
                    finacial organizations.
                  </h5>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-top" data-reveal-delay="200">
              <div
                class="card"
                style={{
                  backgroundColor: "white",
                  borderRadius: "15% 0 0 0",
                }}
              >
                <img
                  style={{
                    borderRadius: "15% 0 0 0",
                  }}
                  class="card-img-top"
                  src={require("./../../assets/images/ceo.jpeg")}
                  alt="CEO photo"
                />
                <div class="card-body">
                  <h5
                    style={{
                      color: "black",

                      marginTop: "0",
                    }}
                  >
                    Henrik Povlsen -{" "}
                    <span
                      style={{
                        color: "#5658DD",

                        marginTop: "0",
                        fontWeight: "600",
                      }}
                    >
                      ADMINISTRATOR
                    </span>
                  </h5>

                  <hr></hr>
                  <h5
                    style={{
                      color: "black",

                      marginTop: "0",
                      fontSize: ".7em",
                      fontWeight: "800",
                    }}
                  >
                    Henrik is a visionary leader with over 9 years in the
                    financial sector. During these 9 years, he worked with 4
                    organizations with annual profit over 14% gains.
                  </h5>
                </div>
              </div>
            </div>

            <div
              className="tiles-item reveal-from-bottom"
              data-reveal-delay="200"
            >
              <div
                class="card"
                style={{
                  backgroundColor: "white",
                  borderRadius: "15% 0 0 0",
                }}
              >
                <img
                  style={{
                    borderRadius: "15% 0 0 0",
                  }}
                  class="card-img-top"
                  src={require("./../../assets/images/cmo.jpeg")}
                  alt="cmo photo"
                />
                <div class="card-body">
                  <h5
                    style={{
                      color: "black",

                      marginTop: "0",
                    }}
                  >
                    Jane Cooks -{" "}
                    <span
                      style={{
                        color: "#5658DD",

                        marginTop: "0",
                        fontWeight: "600",
                      }}
                    >
                      C.M.O
                    </span>
                  </h5>

                  <hr></hr>
                  <h5
                    style={{
                      color: "black",

                      marginTop: "0",
                      fontSize: ".7em",
                      fontWeight: "800",
                    }}
                  >
                    Jane has over 7 years in marketing, strategic planning and
                    corporate communication. During her past 7 years in the
                    industry, she has worked with 4 top-notch financial
                    institution all over the world.
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Team.propTypes = propTypes;
Team.defaultProps = defaultProps;

export default Team;
