import firebase from "firebase";
import { useState, useEffect } from "react";
import { Home } from "./components/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import "./App.css";
import { ChakraProvider, useFocusOnHide } from "@chakra-ui/react";
import { Login } from "./components/Login";
import { Feed } from "./components/Feed";
import { Navbar } from "./components/Navbar";
import { Landing } from "./components/Landing";
import 'lion-player/dist/lion-skin.min.css';

firebase.initializeApp({
  apiKey: "AIzaSyDzEoXNrNgu3Q3GV1aI4s2X75lF50jt_zI",
  authDomain: "fir-auth-tutorial-a425c.firebaseapp.com",
});

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  let history = useHistory();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
  });

  if (isSignedIn === true) {
    return (
        <ChakraProvider>
          <Router>
            <Switch>
              <Route exact path="/">
                <ChakraProvider>
                  <Landing isSignedIn={isSignedIn}/>
                </ChakraProvider>
              </Route>
              <Route exact path="/videos">
                <Feed />
              </Route>
              <Route exact path="/profile">
                <Home />
              </Route>
            </Switch>
          </Router>
        </ChakraProvider>
    );
  } else {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <ChakraProvider>
              <Landing isSignedIn={isSignedIn}/>
            </ChakraProvider>
          </Route>
          <Route exact path="/login">
            <ChakraProvider>
              <Login />
            </ChakraProvider>
          </Route>
        </Switch>
      </Router>
    );
  }
}
//   return (
//     <>
//       <ChakraProvider>
//         {isSignedIn ? (
//           <div className="">
//             <Router>
//               <Switch>
//                 <Route exact path="/feed">
//                   <Feed />
//                 </Route>
//                 <Route exact path="/profile">
//                   <Home />
//                 </Route>
//               </Switch>
//             </Router>
//           </div>
//         ) : (
//           <Router>
//             <Switch>
//               <Route exact path="/login">
//                 <br />
//                 <br />
//                 <ChakraProvider>
//                   <Login />
//                 </ChakraProvider>
//                 <br />
//               </Route>
//             </Switch>
//           </Router>
//         )}
//       </ChakraProvider>
//     </>
//   );
// }

export default App;
