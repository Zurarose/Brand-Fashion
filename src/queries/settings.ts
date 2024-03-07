import { gql } from '@apollo/client';
import { SettingsType } from '../types/settings';

export type SettingsQueryResponseType = {
  getConfig: SettingsType;
};

export const SettingsQuery = gql`
  query getConfig {
    getConfig {
      GETTING_PERCENT_BONUSES
      GIFT_BONUSES_USER_BIRTHDAY
      LIMITED_BONUSES_TIMEOUT_DAYS
    }
  }
`;

export type SettingsQueryRequsetType = SettingsType;

export const SetSettingsMutation = gql`
  mutation setConfig(
    $LIMITED_BONUSES_TIMEOUT_DAYS: Int!
    $GETTING_PERCENT_BONUSES: Float!
    $GIFT_BONUSES_USER_BIRTHDAY: Int!
  ) {
    setConfig(
      LIMITED_BONUSES_TIMEOUT_DAYS: $LIMITED_BONUSES_TIMEOUT_DAYS
      GETTING_PERCENT_BONUSES: $GETTING_PERCENT_BONUSES
      GIFT_BONUSES_USER_BIRTHDAY: $GIFT_BONUSES_USER_BIRTHDAY
    )
  }
`;
