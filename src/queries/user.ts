import { gql } from '@apollo/client';
import { sessionFragment } from './fragments/users-fragments';
import { Viewer } from '../types/user';

export type ViewerResponseType = {
  viewer: Viewer;
};

export const ViewerQuery = gql`
  query viewer {
    viewer {
      ...SessionFragment
    }
  }
  ${sessionFragment}
`;

export type LogInResponseType = {
  logIn: {
    viewer: Viewer;
  };
};
export type LogInRequestType = {
  username: string;
  password: string;
};

export const LogInQuery = gql`
  mutation logIn($username: String!, $password: String!) {
    logIn(input: { username: $username, password: $password }) {
      viewer {
        ...SessionFragment
      }
    }
  }
  ${sessionFragment}
`;
