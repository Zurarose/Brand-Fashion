import { gql } from '@apollo/client';
import { PurchaseMicroFragment } from './fragments/purchases-fragments';
import { Connection, PurchaseT } from '../types/client';

export type StatsQueryResponseType = {
  purchases: Connection<PurchaseT>;
};

export const StatsQuery = gql`
  query purchases($where: PurchaseWhereInput) {
    purchases(where: $where, first: 10000) {
      edges {
        node {
          ...PurchaseMicroFragment
        }
      }
    }
  }
  ${PurchaseMicroFragment}
`;
