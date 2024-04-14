import { gql } from '@apollo/client';
import { PurchaseShortFragment } from './purchases-fragments';

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

export const ClientFullFragment = gql`
  fragment ClientFullFragment on Client {
    id
    objectId
    fullName
    bonuses
    giftedBonuses
    birthday
    phone
    Purchases(order: [date_DESC]) {
      edges {
        node {
          ...PurchaseShortFragment
        }
      }
    }
  }
  ${PurchaseShortFragment}
`;
