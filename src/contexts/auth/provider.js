import React, { useReducer, useEffect, useRef } from "react";
import Cookies from "js-cookie";

import { authReducer } from "./reducer";
import { AuthContext } from "./context";
import {
  getAuthPersistence,
  setAuthPersistence,
} from "../../helpers/authPersistence";

const initialAuthData = () => {
  const authData = getAuthPersistence("AuthData");
  return authData;
};

const AuthContextProvider = (props) => {
  const [authData, dispatch] = useReducer(authReducer, [], initialAuthData);
  const hasMount = useRef(false);

  useEffect(() => {
    if (!hasMount.current) {
      hasMount.current = true;
    } else {
      if (authData) {
        // Cookies.set("AuthData", JSON.stringify(authData), {
        //   expires: authData.expiresIn / 86400,
        // });
        setAuthPersistence("AuthData", authData.token, authData.expiry);
      } else {
        setAuthPersistence("AuthData", null);
      }
    }
  }, [authData]);

  return (
    <AuthContext.Provider value={{ authData, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
