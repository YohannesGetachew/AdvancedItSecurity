import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import customApolloClient from "./config/apollo";
import { AuthContextProvider } from "./contexts/auth";
import "vanilla-antd-message/dist/style.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={customApolloClient}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
