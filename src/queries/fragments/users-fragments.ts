import { gql } from '@apollo/client';

export const sessionFragment = gql`
  fragment SessionFragment on Viewer {
    sessionToken
    user {
      id
      objectId
    }
  }
`;
