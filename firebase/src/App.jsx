import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doSignOut,
} from "./firebase/auth";
import { useState } from "react";

function App() {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorState, setErrorState] = useState("");

  const handleLogin = () => {
    setLogin(!login);
    setSignup(false);
    setErrorWhileLogin(false);
  };

  const handleSignup = () => {
    setSignup(!signup);
    setLogin(false);
    setErrorWhileLogin(false);
  };

  const handleLoginWithGoogle = async () => {
    const user = await doSignInWithGoogle();
    if (!user) {
      setErrorState("Error occurred while signing in with Google.");
      console.log("Error occurred while signing in with Google.");
    }
    setUser(user);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (signup) {
      const user = await doCreateUserWithEmailAndPassword(email, password);
      console.log("User : ", user);
      if (!user) {
        setErrorState("User already exists.");
        console.log("User already exists.");
      }
      setUser(user);
      setLogin(false);
      setSignup(false);
    }

    if (login) {
      const user = await doSignInWithEmailAndPassword(email, password);
      if (!user) {
        setErrorState("Email or password is incorrect.");
        console.log("Email or password is incorrect.");
      }
      setUser(user);
      setLogin(false);
      setSignup(false);
    }
  };

  const handleSignOut = async () => {
    const user = await doSignOut();
    console.log(user);
    setUser(user);
    setLogin(false);
    setSignup(false);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Firebase Authentication</h1>
      {errorState && <h4>{errorState}</h4>}
      {!user && (
        <>
          <button onClick={() => handleLogin()}>Login</button>
          &nbsp;
          <button onClick={() => handleSignup()}>Signup</button>
          <br />
          <br />
          <button onClick={() => handleLoginWithGoogle()}>
            Login with Google
          </button>
        </>
      )}
      {(login || signup) && (
        <form autoComplete="off" onSubmit={(e) => handleFormSubmit(e)}>
          <input
            name="email"
            type="email"
            placeholder="Enter email..."
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            type="password"
            placeholder="Enter password..."
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>{login ? "Login" : "Signup"}</button>
        </form>
      )}
      {user && (
        <>
          <div className="card">
            <br />
            <br />
            <div>
              <p>
                <b>Username : </b>
                {user.name}
              </p>
            </div>
          </div>
          <div>
            <p>
              <b>Email : </b>
              {user.email}
            </p>
          </div>
          <button onClick={() => handleSignOut()}>Logout</button>
        </>
      )}
    </>
  );
}

export default App;
