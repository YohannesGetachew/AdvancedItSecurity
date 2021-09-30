import { ApolloClient, InMemoryCache } from "@apollo/client";
import customLink from "./link";

const client = new ApolloClient({
  link: customLink,
  cache: new InMemoryCache(),
});
export default client;
