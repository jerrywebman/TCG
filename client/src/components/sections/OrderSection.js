import React from "react";

export default function OrderSection() {
  return (
    <div className="container">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h3 className="mt-0 mb-12">Top Investors</h3>

            <div className="table-responsive">
              <table className="table mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>S/N</th>
                    <th>Display Name</th>
                    <th>Date of First Investment</th>
                    <th>Profit Earned</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>June 3, 2019</td>
                    <td>
                      <span className="badge badge-boxed  badge-success">
                        $34,000
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>February 7, 2019</td>
                    <td>
                      <span className="badge badge-boxed  badge-warning">
                        $31,250
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>September 2, 2019</td>
                    <td>
                      <span className="badge badge-boxed  badge-danger">
                        $21,050
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>Gav</td>
                    <td>April 17, 2019</td>
                    <td>
                      <span className="badge badge-boxed  badge-success">
                        $20,900
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>Jones</td>
                    <td>March 2,2020</td>
                    <td>
                      <span className="badge badge-boxed  badge-warning">
                        $16,223
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
