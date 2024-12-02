import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { doSignInWithEmailAndPassword } from "./firebase/auth";

function App() {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log(e);
    const email = e.target[0].value;
    const password = e.target[1].value;
    const user = doSignInWithEmailAndPassword(email, password);
    console.log("User : ", user);
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
      <form autoComplete="off" onSubmit={handleFormSubmit}>
        <input name="email" type="text" placeholder="Enter email..." required />
        <input
          name="password"
          type="password"
          placeholder="Enter password..."
          required
        />
        <button>Login</button>
      </form>
      <div className="card">
        <br />
        <br />
        <div>
          <p>
            <b>Username : </b>
            User name will appear here.
          </p>
        </div>
      </div>
      <div>
        <p>
          <b>Email : </b>
          User's email will appear here.
        </p>
      </div>
    </>
  );
}

export default App;
