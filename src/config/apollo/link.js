import { from, HttpLink, ApolloLink, Observable } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { popupError } from "../../components/errors";
import Cookies from "js-cookie";
import { getAuthPersistence } from "../../helpers/authPersistence";

const API_URL = process.env.REACT_APP_API_URL;

const httpLink = new HttpLink({
  uri: API_URL,
  credentials: "same-origin",
});

const request = async (operation) => {
  const token = getAuthPersistence("AuthData");
  const context = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
  operation.setContext(context);
};

export const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle;
      Promise.resolve(operation)
        .then((oper) => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, response }) => {
    if (graphQLErrors) {
      // console.log(graphQLErrors);
      let graphQLMessge = "";
      graphQLErrors.forEach((error) => {
        if (
          error?.extensions &&
          (error?.extensions?.exception?.response?.statusCode |
            error?.extensions?.exception?.response?.status) >=
            500
        ) {
          return (graphQLMessge = "Something went wrong");
        } else {
          return (graphQLMessge = "Something went wrong");
        }
      });
      return popupError(graphQLMessge);
    }
    if (networkError) {
      // console.log(networkError);
      return popupError("Connection error");
    }
  }
);

const customLink = from([errorLink, requestLink, httpLink]);

export default customLink;
