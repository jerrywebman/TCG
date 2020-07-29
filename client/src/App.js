import React, { useRef, useEffect } from "react";
import { useLocation, Switch } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";
import ReactGA from "react-ga";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";

// Views
import Home from "./views/Home";
import About from "./views/About";
import Error from "./views/Error";
import Users from "./components/auth/Users";
import Admin from "./components/auth/Admin";
import PrivateRoute from "./components/auth/PrivateRoute";
import AdminRoute from "./components/auth/AdminRoute";
import ContactUs from "./views/ContactUs";
import Register from "./components/sections/Register";

import ResetPassword from "./views/ResetPassword";
import Faq from "./views/Faq";

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {
  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add("is-loaded");
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <AdminRoute
            path="/admin/dashboard"
            component={Admin}
            layout={LayoutDefault}
          />
          <PrivateRoute
            path="/user/dashboard"
            component={Users}
            layout={LayoutDefault}
          />
          <AppRoute path="/about" component={About} layout={LayoutDefault} />
          <AppRoute
            path="/contact"
            component={ContactUs}
            layout={LayoutDefault}
          />
          <AppRoute
            path="/register/:id"
            component={Register}
            layout={LayoutDefault}
          />
          <AppRoute path="/faq" component={Faq} layout={LayoutDefault} />
          <AppRoute
            path="/passwordreset"
            component={ResetPassword}
            layout={LayoutDefault}
          />
          <AppRoute component={Error} layout={LayoutDefault} />
        </Switch>
      )}
    />
  );
};

export default App;
