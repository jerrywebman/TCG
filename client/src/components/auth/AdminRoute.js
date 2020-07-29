import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/Auth";

const AdminRoute = ({ component: RouteComponent, layout: Layout, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  Layout = Layout === undefined ? (props) => <>{props.children}</> : Layout;
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser.admin === true ? (
          <Layout>
            <RouteComponent {...routeProps} />
          </Layout>
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
};

export default AdminRoute;
