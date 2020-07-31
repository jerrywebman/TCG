import React, { Component } from "react";
import axios from "axios";

class MailModal extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      message: "",
      subject: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.closeAfterSubmit = this.closeAfterSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  async handleSubmit(e) {
    e.preventDefault();
    const { email, message, subject } = this.state;

    const form = await axios.post("/api/form", {
      email,
      subject,
      message,
    });
    alert("Mail Sent");
  }

  // closeAfterSubmit = () => {
  //   var element = document.querySelectorAll(".btn-close-submit");
  //   element.setAttribute("data-dismiss", "modal");
  // };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div
          className="modal fade"
          id="email-modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Send User Email
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="col-12 mb-3">
                  <label for="">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id=""
                    placeholder="Email"
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="col-12 mb-3">
                  <label for="">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    id=""
                    placeholder="Enter Subject"
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="col-12 mb-3">
                  <label for="validationCustom02">Message</label>
                  <textarea
                    className="form-control"
                    id="validationCustom02"
                    rows="6"
                    cols="50"
                    placeholder="Enter Content"
                    name="message"
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-success btn-close-submit"
                  onClick={() => {
                    // setTimeout(() => {
                    //   var element = document.querySelectorAll(
                    //     ".btn-close-submit"
                    //   );
                    //   element.setAttribute("data-dismiss", "modal");
                    // }, 5000);
                  }}
                  // data-dismiss="modal"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
export default MailModal;
