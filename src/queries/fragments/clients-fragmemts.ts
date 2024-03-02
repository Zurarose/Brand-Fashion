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

export const PurchaseShortFragment = gql`
  fragment PurchaseShortFragment on Purchase {
    id
    objectId
    price
    bonuseReceived
    date
    usedBonuses
    itemName
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
    Purchases {
      edges {
        node {
          ...PurchaseShortFragment
        }
      }
    }
  }
  ${PurchaseShortFragment}
`;
