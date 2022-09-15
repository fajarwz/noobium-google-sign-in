import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';

export default function Home() {
  const [jsonResponse, setJsonResponse] = useState();
  const [apiHost, setApiHost] = useState("http://127.0.0.1:8000");
  const [isError, setIsError] = useState(false);

  const wrapperCodeStyle = {
    width: "100%"
  }
  const codeStyle = {
    fontSize: 12,
    wordWrap: "anywhere"
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Noobium Sign In With Google Test</p>

        <div>
          <form>
            <label><small>Set API Host</small></label>
            <input value={apiHost} onChange={(e) => setApiHost(e.target.value)} />
          </form>
        </div>

        <br />

        <div>API Endpoint: {apiHost}/api/sign-in/google</div>

        <br />

        <GoogleLogin
          onSuccess={response => {
            setJsonResponse()
            fetch(`${apiHost}/api/sign-in/google`, {
              headers: new Headers({ accept: "application/json" }),
              method: 'POST',
              body: JSON.stringify({token: response.credential}),
            })
              .then((response) => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error("Something went wrong!");
              })
              .then((data) => setJsonResponse(data))
              .catch((error) => {
                setIsError(true)
                console.log(error);
              });
          }}
          onError={() => {
            setJsonResponse()
            console.log('Login Failed');
          }}
        />
        <div>
          { 
            jsonResponse &&
            <div style={wrapperCodeStyle}>
              <p>Login success! Here is your info</p>
              <code style={codeStyle}>
                  { JSON.stringify(jsonResponse, null, 2) }
              </code>
            </div>
          }
          { isError && <div>Error occured, See Console!</div> }
        </div>
      </header>
    </div>
  );
}
