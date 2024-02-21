import { gql } from '@apollo/client';

export const ClientShortFragment = gql`
  fragment ClientShortFragment on Client {
    id
    objectId
    fullName
    bonuses
    giftedBonuses
    birthday
    phone
  }
`;
