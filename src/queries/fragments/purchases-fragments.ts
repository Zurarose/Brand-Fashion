import { gql } from '@apollo/client';

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

export const PurchaseMicroFragment = gql`
  fragment PurchaseMicroFragment on Purchase {
    objectId
    price
    bonuseReceived
    date
    usedBonuses
  }
`;
