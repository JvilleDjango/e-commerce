import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import Header from "../components/header/header";
import SignInOut from "./signinout/sign-in-out";
import HomePage from "./home/HomePage";
import ShopPage from "./shop/ShopPage";
import CheckOut from "./checkout/check-out";

import { selectCurrentUser } from "../redux/user/user-selector";
import { checkUserSession } from "../redux/user/user-actions";

const App = props => {
  useEffect(() => {
    const { checkUserSession } = props;
    checkUserSession();

    let unsubscribeFromAuth = null;
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckOut} />
        <Route
          exact
          path="/signin"
          render={() =>
            props.currentUser ? <Redirect to="/" /> : <SignInOut />
          }
        />
      </Switch>
    </div>
  );
};

// class App extends React.Component {
//   constructor(){
//     super()

//     this.state = {
//       currentUser: null
//     }
//   }

//   unsubscribeFromAuth = null;

//   componentDidMount() {
//     this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
//       this.setState({currentUser: user});

//       console.log(user)
//     })
//   };

//   componentWillUnmount() {
//     this.unsubscribeFromAuth()
//   }

//   render() {
//     return (
//           <div>
//             <BrowserRouter>
//               <Header currentUser={this.state.currentUser} />
//               <Switch>
//                 <Route exact path="/" component={HomePage} />
//                 <Route exact path="/shop" component={ShopPage} />
//                 <Route exact path="/signin" component={SignInOut} />
//               </Switch>
//             </BrowserRouter>
//           </div>
//         );
//   }

// }

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
