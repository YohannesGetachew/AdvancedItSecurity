import { gql, useMutation, useQuery } from "@apollo/client";
import { EditFeedback } from "../components/Feedback/editFeedback";

const CREATE_FEEDBACK = gql`
  mutation CreateFeedback($feedbackInput: FeedbackInput!) {
    createFeedback(feedbackInput: $feedbackInput) {
      _id
      comment
      file
    }
  }
`;

export const MY_FEEDBACKS = gql`
  query MyFeedbacks($feedbackId: String) {
    myFeedbacks(feedbackId: $feedbackId) {
      _id
      comment
      file
      user {
        email
        firstName
        lastName
      }
    }
  }
`;

export const EDIT_FEEDBACK = gql`
  mutation EditFeedback($feedbackInput: FeedbackInput!, $feedbackId: String!) {
    editFeedback(feedbackInput: $feedbackInput, feedbackId: $feedbackId) {
      _id
      comment
      file
      user {
        email
        firstName
        lastName
      }
    }
  }
`;
//editFeedback(feedbackInput: FeedbackInput!, feedbackId: String!): Feedback

export const FEEDBACKS = gql`
  query Feedbacks($userId: String) {
    feedbacks(userId: $userId) {
      _id
      comment
      file
      user {
        _id
        email
        firstName
        lastName
      }
    }
  }
`;

export const useCreateFeedback = (options = {}) => {
  return useMutation(CREATE_FEEDBACK, options);
};

export const useGetMyFeedbacks = (options = {}) => {
  return useQuery(MY_FEEDBACKS, options);
};

export const useGetFeedbacksAdmin = (options = {}) => {
  return useQuery(FEEDBACKS, options);
};

export const useEditFeedback = (options = {}) => {
  return useMutation(EDIT_FEEDBACK, options);
};
