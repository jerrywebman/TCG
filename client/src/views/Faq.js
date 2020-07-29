import React, { useEffect } from "react";
import AuthModals from "../components/sections/AuthModals";
import SectionHeader from "../components/sections/partials/SectionHeader";

export default function Faq() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionHeader = {
    title: "Frequently Asked Questions",
    paragraph: "",
  };

  return (
    <div className="container" style={{ marginTop: "9em", fontSize: "15px" }}>
      <SectionHeader
        data={sectionHeader}
        className="center-content"
        style={{ marginTop: "7em" }}
      />
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div
              class="panel-group"
              id="accordion"
              role="tablist"
              aria-multiselectable="true"
            >
              {/* //here */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingOne">
                  <h4 class="panel-title">
                    <a
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      What is The Coin Growth Company Ltd?
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseOne"
                  class="panel-collapse collapse in"
                  role="tabpanel"
                  aria-labelledby="headingOne"
                >
                  <div
                    class="panel-body"
                    style={{
                      color: "#ffffff",
                    }}
                  >
                    The Coin Growth Company Ltd is an investment company based
                    in Norway that provides investment through the mining of
                    cryptocurrency.
                  </div>
                </div>
              </div>
              {/* here */}
              {/* //here */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingOne">
                  <h4 class="panel-title">
                    <a
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseTwo"
                      aria-expanded="true"
                      aria-controls="headingTwo"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      Is The Coin Growth business legal?
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseTwo"
                  class="panel-collapse collapse in"
                  role="tabpanel"
                  aria-labelledby="headingTwo"
                >
                  <div class="panel-body" style={{ color: "#ffffff" }}>
                    We are a licensed and registered company and we adhere
                    strictly to the rules and regulations of both Norway, United
                    Kingdom and several other countries that support investments
                    of any kind.
                  </div>
                </div>
              </div>
              {/* here */}
              {/* //here */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingThree">
                  <h4 class="panel-title">
                    <a
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseThree"
                      aria-expanded="true"
                      aria-controls="headingThree"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      How does The Coin Growth make profits?
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseThree"
                  class="panel-collapse collapse in"
                  role="tabpanel"
                  aria-labelledby="headingThree"
                >
                  <div class="panel-body" style={{ color: "#ffffff" }}>
                    We are an investment company that relies on cryptocurrency
                    mining and trading of digital assets to generate excellent
                    revenues
                  </div>
                </div>
              </div>
              {/* here */}
              {/* //here */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingFour">
                  <h4 class="panel-title">
                    <a
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseFour"
                      aria-expanded="true"
                      aria-controls="headingFour"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      How do I open an account?
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseFour"
                  class="panel-collapse collapse in"
                  role="tabpanel"
                  aria-labelledby="headingFour"
                >
                  <div class="panel-body" style={{ color: "#ffffff" }}>
                    Opening an account is quite easy. What you need to do is to
                    sign up by clicking this link Then, fill out all the
                    important information on the account creation page.
                  </div>
                </div>
              </div>
              {/* here */}
              {/* //here */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingFive">
                  <h4 class="panel-title">
                    <a
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseFive"
                      aria-expanded="true"
                      aria-controls="headingFive"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      Do I need to pay for opening of account?
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseFive"
                  class="panel-collapse collapse in"
                  role="tabpanel"
                  aria-labelledby="headingFive"
                >
                  <div class="panel-body" style={{ color: "#ffffff" }}>
                    Setting up an account doesn't cost any fee. It's free of
                    charge.
                  </div>
                </div>
              </div>
              {/* here */}
              {/* //here */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingA">
                  <h4 class="panel-title">
                    <a
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseA"
                      aria-expanded="true"
                      aria-controls="headingA"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      I forgot my account password. What do i do ?
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseA"
                  class="panel-collapse collapse in"
                  role="tabpanel"
                  aria-labelledby="headingA"
                >
                  <div class="panel-body" style={{ color: "#ffffff" }}>
                    In the case where you forgot your password, simply click on
                    the forgot password feature on the page. Then provide your
                    email and a password reset link will be sent to your email
                  </div>
                </div>
              </div>
              {/* here */}
              {/* //here */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingz">
                  <h4 class="panel-title">
                    <a
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapsez"
                      aria-expanded="true"
                      aria-controls="headingz"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      How many investment plans can I register for?
                    </a>
                  </h4>
                </div>
                <div
                  id="collapsez"
                  class="panel-collapse collapse in"
                  role="tabpanel"
                  aria-labelledby="headingz"
                >
                  <div class="panel-body" style={{ color: "#ffffff" }}>
                    You can sign up for as many investment plans as you want.
                  </div>
                </div>
              </div>
              {/* here */}
              {/* //here */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingB">
                  <h4 class="panel-title">
                    <a
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseB"
                      aria-expanded="true"
                      aria-controls="headingB"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      What is the minimum and maximum deposit limit?
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseB"
                  class="panel-collapse collapse in"
                  role="tabpanel"
                  aria-labelledby="headingB"
                >
                  <div class="panel-body" style={{ color: "#ffffff" }}>
                    The minimum deposit limit is $50 while the maximum deposit
                    amount is $1,000,000 per deposit.
                  </div>
                </div>
              </div>
              {/* here */}
              {/* //here */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingC">
                  <h4 class="panel-title">
                    <a
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseC"
                      aria-expanded="true"
                      aria-controls="headingC"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      How long does it take for my deposit to be added to my
                      account?
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseC"
                  class="panel-collapse collapse in"
                  role="tabpanel"
                  aria-labelledby="headingC"
                >
                  <div class="panel-body" style={{ color: "#ffffff" }}>
                    Your account will be updated as fast, as you deposit.
                  </div>
                </div>
              </div>
              {/* here */}
              {/* //here */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingD">
                  <h4 class="panel-title">
                    <a
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseD"
                      aria-expanded="true"
                      aria-controls="headingD"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      Can I increase my investment?
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseD"
                  class="panel-collapse collapse in"
                  role="tabpanel"
                  aria-labelledby="headingD"
                >
                  <div class="panel-body" style={{ color: "#ffffff" }}>
                    Of course you can. You are free to increase your investments
                    at any time and the increment will be added to your deposit
                    after the payment system confirms it.
                  </div>
                </div>
              </div>
              {/* here */}
              {/* //here */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingE">
                  <h4 class="panel-title">
                    <a
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseE"
                      aria-expanded="true"
                      aria-controls="headingE"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      How quickly are payments made?
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseE"
                  class="panel-collapse collapse in"
                  role="tabpanel"
                  aria-labelledby="headingE"
                >
                  <div class="panel-body" style={{ color: "#ffffff" }}>
                    All payments are instant.
                  </div>
                </div>
              </div>
              {/* here */}
            </div>
          </div>
        </div>
      </div>

      <AuthModals />
    </div>
  );
}
