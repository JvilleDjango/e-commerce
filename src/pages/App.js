import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import Header from "../components/header/header";
import Spinner from "../components/spinner/spinner";
import ErrorBoundry from "../components/error-boundry/error-boundry";

import { selectCurrentUser } from "../redux/user/user-selector";
import { checkUserSession } from "../redux/user/user-actions";

const HomePage = lazy(() => import("./home/HomePage"));
const ShopPage = lazy(() => import("./shop/ShopPage"));
const SignInOut = lazy(() => import("./signinout/sign-in-out"));
const CheckOut = lazy(() => import("./checkout/check-out"));

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <Header />
      <Switch>
        <ErrorBoundry>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckOut} />
            <Route
              exact
              path="/signin"
              render={() => (currentUser ? <Redirect to="/" /> : <SignInOut />)}
            />
          </Suspense>
        </ErrorBoundry>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
