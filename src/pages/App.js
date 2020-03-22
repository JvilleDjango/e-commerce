import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {createStructuredSelector} from 'reselect';

import "./App.css";

import Header from "../components/header/header";
import SignInOut from "./signinout/sign-in-out";
import HomePage from "./home/HomePage";
import ShopPage from "./shop/ShopPage";
import CheckOut from "./checkout/check-out";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";
import { setCurrentUser } from "../redux/user/user-actions";
import {selectCurrentUser} from '../redux/user/user-selector'

const App = props => {
  let unsubscribeFromAuth = null;

  useEffect(() => {
    const { setCurrentUser } = props;

    let unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({ id: snapShot.id, ...snapShot.data() });
        });
      }

      setCurrentUser(userAuth);

      return () => {
        unsubscribeFromAuth();
      };
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckOut} />
          <Route
            exact
            path="/signin"
            render={() =>
              props.currentUser ? <Redirect to="/" /> : <SignInOut />
            }
          />
        </Switch>
      </BrowserRouter>
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
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
