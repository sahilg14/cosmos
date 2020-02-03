import React from "react";
import Amplify from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react"; // or 'aws-amplify-react-native';
import "./App.css";
import Application from "./components/app";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <Application />
    </div>
  );
}

export default withAuthenticator(App, true);
