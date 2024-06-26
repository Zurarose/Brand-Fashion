import { gql } from '@apollo/client';
import { ClientFullFragment, ClientShortFragment } from './fragments/clients-fragments';
import { ClientT, Connection, PurchaseT } from '../types/client';
import { PurchaseShortFragment } from './fragments/purchases-fragments';

export type ClientsResponseType = {
  clients: Connection<ClientT>;
};

export const ClientQuery = gql`
  query clients($where: ClientWhereInput) {
    clients(where: $where, first: 1000) {
      edges {
        node {
          ...ClientShortFragment
        }
      }
    }
  }
  ${ClientShortFragment}
`;

export type ClientPurchasesResponseType = {
  client: ClientT;
};

export const ClientPurchasesQuery = gql`
  query client($id: ID!) {
    client(id: $id) {
      ...ClientFullFragment
    }
  }
  ${ClientFullFragment}
`;

export type DeleteClientRequestType = {
  id: string;
};

export type DeleteClientResponseType = {
  deleteClient: {
    client: {
      id: string;
    };
  };
};

export const DeleteClientMutation = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(input: { id: $id }) {
      client {
        id
      }
    }
  }
`;

export type CreateClientResponseType = {
  createClient: {
    client: ClientT;
  };
};

export type CreateClientRequestType = {
  fields: Pick<ClientT, 'fullName' | 'phone'> & { birthday: Date };
};

export const CreateClientMutation = gql`
  mutation createClient($fields: CreateClientFieldsInput!) {
    createClient(input: { fields: $fields }) {
      client {
        ...ClientShortFragment
      }
    }
  }
  ${ClientShortFragment}
`;

export type CreatePurchaseResponseType = {
  createPurchase: {
    purchase: PurchaseT;
  };
};

export type CreatePurchaseRequestType = {
  fields: Pick<PurchaseT, 'usedBonuses' | 'itemName' | 'price'> & { date: Date; Client: { link: string } };
};

export const CreatePurchaseMutation = gql`
  mutation createPurchase($fields: CreatePurchaseFieldsInput!) {
    createPurchase(input: { fields: $fields }) {
      purchase {
        ...PurchaseShortFragment
      }
    }
  }
  ${PurchaseShortFragment}
`;
export type SetBonusesRequestType = {
  userId: string;
  amount: number;
  amountgifted: number;
};

export const SetBonusesMutation = gql`
  mutation setBonuses($userId: String!, $amount: Float!, $amountgifted: Float!) {
    setBonuses(userId: $userId, amount: $amount, amountgifted: $amountgifted)
  }
`;

export type EditClientResponseType = {
  updateClient: {
    client: ClientT;
  };
};

export type EditClientRequestType = {
  id: string;
  fields: Pick<ClientT, 'fullName' | 'phone'> & { birthday: Date };
};

export const EditClientMutation = gql`
  mutation updateClient($id: ID!, $fields: UpdateClientFieldsInput!) {
    updateClient(input: { id: $id, fields: $fields }) {
      client {
        ...ClientShortFragment
      }
    }
  }
  ${ClientShortFragment}
`;
