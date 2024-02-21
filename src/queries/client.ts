import { gql } from '@apollo/client';
import { ClientShortFragment } from './fragments/clients-fragmemts';
import { Client } from '../types/client';

export type ClientsResponseType = {
  clients: {
    edges: {
      node: Client;
    }[];
  };
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
    client: Client;
  };
};

export type CreateClientRequestType = {
  fields: Pick<Client, 'fullName' | 'phone'> & { birthday: Date };
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
