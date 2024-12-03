import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignOut,
} from "./firebase/auth";
import { useState } from "react";

function App() {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    setLogin(!login);
    setSignup(false);
  };

  const handleSignup = () => {
    setSignup(!signup);
    setLogin(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (signup) {
      const user = await doCreateUserWithEmailAndPassword(email, password);
      console.log(user);
      setUser(user);
      setLogin(false);
      setSignup(false);
    }

    if (login) {
      const user = await doSignInWithEmailAndPassword(email, password);
      console.log(user);
      setUser(user);
      setLogin(false);
      setSignup(false);
    }
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
      {!user && (
        <>
          <button onClick={() => handleLogin()}>Login</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={() => handleSignup()}>Signup</button>
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
          <button onClick={() => doSignOut()}>Logout</button>
        </>
      )}
    </>
  );
}

export default App;
