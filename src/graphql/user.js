import { gql, useMutation, useQuery } from "@apollo/client";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const useLogin = (options = {}) => {
  return useMutation(LOGIN, options);
};

const WHOAMI = gql`
  query {
    whoami {
      _id
      firstName
      lastName
      email
      role
      isActive
    }
  }
`;

const USERS = gql`
  query {
    users {
      _id
      firstName
      lastName
      email
      role
      isActive
    }
  }
`;

const DISABLE_USER = gql`
  mutation DisableUser($userId: String!) {
    disableUser(userId: $userId) {
      _id
      firstName
    }
  }
`;

//    createUser(userInput: UserInput!): User

const CREATE_USER = gql`
  mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      _id
      firstName
    }
  }
`;

export const useCreateUser = (options = {}) => {
  return useMutation(CREATE_USER, options);
};

export const useDisableUser = (options = {}) => {
  return useMutation(DISABLE_USER, options);
};

export const useWhoami = (options = {}) => {
  return useQuery(WHOAMI, options);
};

export const useUsers = (options = {}) => {
  return useQuery(USERS, options);
};
