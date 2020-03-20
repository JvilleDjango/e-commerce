import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";

import Header from "../components/header/header";
import SignInOut from "./signinout/sign-in-out";
import HomePage from "./home/HomePage";
import ShopPage from "./shop/ShopPage";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  let unsubscribeFromAuth = null;

  useEffect(() => {
    let unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({id: snapShot.id , ...snapShot.data()});
        });
        
      }

      setCurrentUser(userAuth)

      return () => {
        unsubscribeFromAuth();
      };
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header currentUser={currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInOut} />
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

export default App;
