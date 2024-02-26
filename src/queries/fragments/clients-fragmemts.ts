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
