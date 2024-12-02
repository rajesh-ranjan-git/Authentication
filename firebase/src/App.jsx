import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useAuth } from "./contexts/authContext/auth";

function App() {
  const { userLoggedIn } = useAuth();
  console.log(user);

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
      <h1>Vite + React + Auth0 (OAuth2) Authentication</h1>
      <div className="card">
        {!isAuthenticated ? (
          <button onClick={() => loginWithRedirect()}>Login</button>
        ) : (
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        )}
        <br />
        <br />
        {isAuthenticated && (
          <div>
            <img
              src={user.picture}
              alt="Profile Picture"
              style={{ borderRadius: "100%" }}
            />
            <p>
              <b>Username : </b>
              {user.name}
            </p>
          </div>
        )}
      </div>
      {isAuthenticated && (
        <div>
          <p>
            <b>Email : </b>
            {user.email}
          </p>
        </div>
      )}
    </>
  );
}

export default App;
